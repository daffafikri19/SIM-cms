"use client";

import React, { useState } from "react";
import { Button, Form, type FormProps, Input, App } from "antd";
import axios from "axios";
import { useLocalStorage } from "usehooks-ts";

type FieldType = {
  email?: string;
  password?: string;
};

export const LoginForm = () => {
  const [value, setValue] = useLocalStorage("funBreadToken", null);
  const [loading, setLoading] = useState(false);
  const { message } = App.useApp();
  
  const handleLogin: FormProps<FieldType>["onFinish"] = async (values) => {
    setLoading(true)
    try {
      const res = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/api/auth/login", {
        email: values.email,
        password: values.password
      }, {
        withCredentials: true
      });
      message.success(res.data.message)
      setValue(res.data.token)
      window.location.href = "/dashboard"
    } catch (error : any) {
      setLoading(false)
      if(error.response) {
        message.error(error.response.data.message)
      }
    }
  }  

  return (
    <div className="grid">
      <Form name="login" layout="vertical" onFinish={handleLogin}>
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
