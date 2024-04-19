import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  const { name, email, profile_picture, role, password, shift } = await req.json();

  const existingEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingEmail) {
    return NextResponse.json("Email sudah digunakan diakun lain", {
      status: 400,
    });
  }

  const exisitingName = await prisma.user.findUnique({
    where: {
      name,
    },
  });

  if (exisitingName) {
    return NextResponse.json("Nama sudah digunakan diakun lain", {
      status: 400,
    });
  }

  const existingRole = await prisma.user_role.findFirst({
    where: {
      name: role,
    },
  });

  if (!existingRole) {
    return NextResponse.json(`role ${role} tidak ditemukan`, {
      status: 404,
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  try {
    await prisma.user.create({
      data: {
        name,
        email,
        profile_picture,
        role: {
          connect: {
            id: existingRole.id,
          },
        },
        password: hashPassword,
        shift
      },
    });

    return NextResponse.json("Berhasil register akun", {
        status: 201
    })
  } catch (error: any) {
    return NextResponse.json(error.message, {
      status: 500,
    });
  }
}
