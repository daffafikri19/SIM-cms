import { formatInputNumber, parserInputNumber } from "@/libs/formatter";
import { Form, Input, InputNumber } from "antd";
import React from "react";

type Props = {
  name: string;
  label: string;
  rules?: any;
  type: "common" | "number";
  prefix?: string;
  className?: string;
  onChange?: ((value: any) => void) | undefined;
};

export const FormItem = (props: Props) => {
  return (
    <Form.Item label={props.label} name={props.name}>
      {props.type === "number" ? (
        <InputNumber type="number" prefix={props.prefix} formatter={formatInputNumber} parser={parserInputNumber} className={`!w-full ${props.className}`} onChange={props.onChange} />
      ) : (
        <Input type="text" prefix={props.prefix} className={`!w-full ${props.className}`} onChange={props.onChange} />
      )}
    </Form.Item>
  );
};
