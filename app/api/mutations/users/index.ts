"use server";

import { RegisterProps, UserProps } from "@/types";
import axios from "axios";
import { revalidatePath } from "next/cache";

export const fetchUserData = async ({
  take,
  skip,
  search,
}: {
  take: number;
  skip: number;
  search: string | null;
}) => {
  try {
    const res = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "/api/user/all",
      {
        params: {
          take,
          skip,
          search: search ? search : null,
        },
      }
    );
    revalidatePath("/dashboard/manage-user");
    return res.data.data;
  } catch (error: any) {
    if (error.response) {
      return {
        mesasge: error.response.data.message,
        status: 500,
      };
    }
  }
};

export const fetchRoleData = async () => {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/api/user/role/all",
      {
        cache: "no-cache",
      }
    );

    revalidatePath("/dashboard/manage-user");
    const data = await res.json();
    return data.data;
  } catch (error: any) {
    if (error.response) {
      return {
        message: error.response.data.message,
        status: 500,
      };
    }
  }
};

export const fetchUserDataById = async ({ id }: { id: string }) => {
  try {
    const res = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + `/api/user/get/${id}`,
      {
        id: id,
      }
    );

    revalidatePath("/dashboard/manage-user");
    return res.data.data;
  } catch (error: any) {
    if (error.response) {
      return {
        message: error.response.data.message,
        status: error.response.status,
      };
    }
  }
};

export const registerUser = async ({
  name,
  email,
  profile_picture,
  role,
  shift,
  password,
  confirmPassword,
}: RegisterProps) => {
  try {
    const res = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + "/api/auth/register",
      {
        name,
        email,
        profile_picture,
        role,
        shift,
        password,
        confPassword: confirmPassword,
      }
    );

    revalidatePath("/dashboard/manage-user/add-user");
    revalidatePath("/dashboard/manage-user");
    return {
      message: res.data.message,
      status: res.status,
    };
  } catch (error: any) {
    if (error.response) {
      return {
        message: error.response.data.message,
        status: 500,
      };
    }
  }
};

export const editUserAccount = async ({
  id,
  name,
  email,
  profile_picture,
  role,
  shift,
}: UserProps) => {
  try {
    const res = await axios.patch(
      process.env.NEXT_PUBLIC_API_URL + `/api/user/update/${id}`,
      {
        id,
        name,
        email,
        profile_picture,
        role,
        shift,
      }
    );

    revalidatePath("/dashboard/manage-user/edit-user");
    revalidatePath("/dashboard/manage-user");
    return {
      message: res.data.message,
      status: 200
    };
  } catch (error: any) {
    if (error.response) {
      return {
        message: error.response.data.message,
        status: 500,
      };
    }
  }
};

export const deleteUserAccount = async ({ id } : { id: string }) => {
  try {
    const res = await axios.post(process.env.NEXT_PUBLIC_API_URL + `/api/user/delete/${id}`, {
      id
    });
    revalidatePath("/dashboard/manage-user");
    return res.data
  } catch (error: any) {
    if (error.response) {
      return {
        message: error.response.data.message,
        status: 500,
      };
    }
  }
}