"use client";

import { refresher } from "@/app/api/services/refresher";
import {
  formatDateTimeString,
  formatInputNumber,
  parserInputNumber,
} from "@/libs/formatter";
import { IngredientProps, authProps } from "@/types";
import {
  App,
  Button,
  Card,
  Form,
  FormProps,
  InputNumber,
  Typography,
} from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";

type props = {
  data: IngredientProps[];
  session: authProps;
};
export const FormIngredient = ({ data, session }: props) => {
  const [pending, startTransition] = useTransition();
  const { message } = App.useApp();
  const router = useRouter();

  const transformToArray = (data: any) => {
    return Object.keys(data).reduce((result: any, key) => {
      const [id, type] = key.split("_");
      const obj = result.find((o: any) => o.id === id) || { id };

      obj[type] = data[key];

      if (!result.includes(obj)) result.push(obj);

      return result;
    }, []);
  };

  const submitData: FormProps<IngredientProps>["onFinish"] = async (values) => {
    const data = transformToArray(values);

    startTransition(async () => {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/report/ingredient/create`,
          {
            date: new Date(Date.now()).toISOString(),
            reporter: session.name,
            details: data,
          }
        );

        if (res.status === 201) {
          message.success(res.data.message);
          await refresher({ path: "/dashboard/report/sales" });
          return router.push("/dashboard/report/ingredient");
        } else {
          message.error(res.data.message);
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          message.error(error.response.data.message || "Unknown error");
        } else {
          message.error("Error submitting the form");
        }
      }
    });
  };

  return (
    <Card
      title={
        <div>
          <Typography>Laporan Bahan Baku</Typography>
          <Typography>
            Tanggal : {formatDateTimeString(new Date(Date.now()).toISOString())}
          </Typography>
        </div>
      }
    >
      <Form onFinish={submitData}>
        {data.map((item, index) => (
          <div key={item.id} className="!w-full grid grid-cols-2 gap-2">
            <Form.Item
              name={`${item.id}_quantity`}
              label={item.name}
              rules={[
                {
                  required: true,
                  message: `quantity ${item.name} harus diisi`,
                },
              ]}
            >
              <InputNumber
                className="!w-full"
                suffix="gram"
                min={0}
                formatter={formatInputNumber}
                parser={parserInputNumber}
              />
            </Form.Item>
            <Form.Item
              name={`${item.id}_pieces`}
              rules={[
                { required: true, message: `pieces ${item.name} harus diisi` },
              ]}
            >
              <InputNumber
                className="!w-full"
                suffix="pcs"
                min={0}
                formatter={formatInputNumber}
                parser={parserInputNumber}
              />
            </Form.Item>
          </div>
        ))}

        <Form.Item>
          <div className="flex items-center justify-end gap-2">
            <Button
              htmlType="button"
              type="dashed"
              danger
              disabled={pending}
              onClick={() => router.push("/dashboard/report/ingredient")}
            >
              Batal
            </Button>
            <Button
              htmlType="submit"
              type="primary"
              disabled={pending}
              loading={pending}
            >
              Kirim
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Card>
  );
};
