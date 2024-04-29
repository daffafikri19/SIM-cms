"use client";

import React, { useState } from "react";
import { Button, Form, type FormProps, Input, Alert } from "antd";
import { useLoadingContext } from "@/store/use-loading";
import { redirect, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { ServerProps } from "@/types";

type FieldType = {
  email?: string;
  password?: string;
};

export const LoginForm = (props : ServerProps) => {
  const { loading, setLoading } = useLoadingContext();
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  if(props.searchParams?.callbackUrl) {
    redirect("/")
  }
  
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (result?.error) {
        setErrorMessage(result?.error);
        console.log(result?.error);
        setLoading(false);
      } else {
        console.log(result);
        return (router.push("/dashboard"));
      }
    } catch (error : any) {
      setErrorMessage(error?.message);
      console.log("error auth", error);
      setLoading(false);
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
