"use client";

import React, { useState } from "react";
import { Button, Form, type FormProps, Input, Alert, message } from "antd";
import { useLoadingContext } from "@/store/use-loading";
import { useRouter } from "next/navigation";
import { ServerProps } from "@/types";
import axios from "axios";
import { useLocalStorage } from "usehooks-ts";

type FieldType = {
  email?: string;
  password?: string;
};

export const LoginForm = (props: ServerProps) => {
  const { loading, setLoading } = useLoadingContext();
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [value, setValue] = useLocalStorage("funBreadToken", null);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/api/auth/login",
        {
          email: values.email,
          password: values.password,
        },
        {
          withCredentials: true,
        }
      );
      setValue(res.data.token);
      messageApi.success(res.data.message);
      setLoading(false);
      return router.push('/dashboard')
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <div className="grid">
      {contextHolder}
      <Form name="login" layout="vertical" onFinish={onFinish}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Form.Item<FieldType>
              label="Email"
              name="email"
              htmlFor="email"
              rules={[{ required: true, message: "Email wajib diisi" }]}
            >
              <Input type="email" placeholder="admin@gmail.com" />
            </Form.Item>

            <Form.Item<FieldType>
              label="Password"
              name="password"
              htmlFor="password"
              rules={[{ required: true, message: "Password wajib diisi" }]}
            >
              <Input.Password type="password" />
            </Form.Item>
          </div>
          {errorMessage && (
            <Alert message={errorMessage} type="error" showIcon />
          )}
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            icon
            disabled={loading}
          >
            Login
          </Button>
        </div>
      </Form>
    </div>
  );
};
