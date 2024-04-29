import React from "react";
import { Button, Space } from "antd";
import { TableData } from "./table-data";
import { PlusOutlined } from "@ant-design/icons";
import Link from "next/link";

const ReportStockPage = () => {
  return (
    <div>
       <Link href={"/dashboard/report/stock/create"}>
          <Button type="primary" icon={<PlusOutlined />} className="float-end mb-5">
            Buat Laporan
          </Button>
        </Link>
        <TableData data={[]} />
    </div>
  );
};

export default ReportStockPage;
