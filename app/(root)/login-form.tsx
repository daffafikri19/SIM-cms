"use client";

import React, { useState } from "react";
import axios from "axios";
import { Button, Form, type FormProps, Input, Alert } from "antd";
import { useLoadingContext } from "@/store/use-loading";
import { useRouter } from "next/navigation";

type FieldType = {
  email?: string;
  password?: string;
};

export const LoginForm = () => {
  const { loading, setLoading } = useLoadingContext();
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setLoading(true)
    try {
      const res = await axios.post(
        process.env.NEXT_PUBLIC_BACKEND_SERVER_URL + "/api/auth/login",
        {
          email: values.email,
          password: values.password,
        },
        {
          withCredentials: true
        }
      );
      router.push("/dashboard")
      setLoading(false)
      return res.data
    } catch (error: any) {
      if(error.response) {
        setErrorMessage(error.response.data.message);
      }
      console.log(error);
      setLoading(false)
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
          <Button type="primary" htmlType="submit" loading={loading} icon disabled={loading}>
            Login
          </Button>
        </div>
      </Form>
    </div>
  );
};
