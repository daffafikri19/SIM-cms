import { Card } from "antd";
import React from "react";
import { TableData } from "./table-data";
import { ServerProps, UserDisplayProps } from "@/types";

const ManageUserPage = async ({ params, searchParams }: ServerProps) => {
  return (
    <div>
      <TableData data={[]} />
    </div>
  );
};

export default ManageUserPage;
