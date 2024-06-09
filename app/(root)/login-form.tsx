"use client";

import React, { useState, useTransition } from "react";
import { Button, Form, type FormProps, Input, Alert, message } from "antd";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useLocalStorage } from "usehooks-ts";

type FieldType = {
  email?: string;
  password?: string;
};

export const LoginForm = () => {
  const [pending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const [value, setValue] = useLocalStorage("funBreadToken", null);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      startTransition(async () => {
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
        window.location.href = '/dashboard';
      })
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="grid">
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
            loading={pending}
            icon
            disabled={pending}
          >
            Login
          </Button>
        </div>
      </Form>
    </div>
  );
};
