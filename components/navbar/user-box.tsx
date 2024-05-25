"use client";
import React, { useTransition } from "react";
import axios from "axios";
import { Dropdown, MenuProps, Typography, message } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  InfoCircleOutlined,
  ClockCircleOutlined,
  DownOutlined
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { UseAuth } from "@/store/use-auth";
import { useLocalStorage, useMediaQuery } from "usehooks-ts";

export const UserBox = () => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const { userid, name, email, role, shift } = UseAuth();
  const onMobile = useMediaQuery("(max-width: 800px)");
  const [token, setToken] = useLocalStorage("funBreadToken", null);

  const items: MenuProps["items"] = onMobile
    ? [
        {
          label: name,
          key: "name",
          icon: <UserOutlined />,
          danger: false,
        },
        {
          label: role,
          key: "role",
          icon: <InfoCircleOutlined />,
          danger: false,
        },
        {
          label: shift,
          key: "shift",
          icon: <ClockCircleOutlined />,
          danger: false,
        },
        {
          label: "Akun Saya",
          key: "1",
          icon: <UserOutlined />,
          danger: false,
        },
        {
          label: "Logout",
          key: "2",
          icon: <LogoutOutlined />,
          danger: true,
        },
      ]
    : [
        {
          label: "Akun Saya",
          key: "1",
          icon: <UserOutlined />,
          danger: false,
        },
        {
          label: "Logout",
          key: "2",
          icon: <LogoutOutlined />,
          danger: true,
        },
      ];

  const onClick: MenuProps["onClick"] = async ({ key }) => {
    if (key === "1") {
      router.push("/dashboard/my-account");
    }
    if (key === "2") {
      startTransition(async () => {
        try {
          const res = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/api/auth/logout", { userid: userid }, {
            withCredentials: true
          });
          if (res.status === 200) {
            localStorage.removeItem('funBreadToken');
            message.success(res.data.message);
            return router.push("/");
          }
        } catch (error : any) {
          message.error(error.response.data.message);
          return;
        }
      })
    }
  };

  if(onMobile) {
    return (
      <Dropdown menu={{ items, onClick, disabled: pending }}>
      <DownOutlined />
    </Dropdown>
    )
  } else {
    return (
      <Dropdown menu={{ items, onClick }}>
      <div className="flex flex-col">
          <Typography>{name}</Typography>
          <Typography>{role}</Typography>
        </div>
    </Dropdown>
    )
  }
};
