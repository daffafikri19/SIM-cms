"use client";

import React, { useState } from "react";
import { Pagination, PaginationProps } from "antd";
import { usePathname, useRouter } from "next/navigation";

type props = {
  total: number;
  page: number;
  pageSize: number | undefined;
};

export const CustomPagination = (props: props) => {
  const [current, setCurrent] = useState(props.page);
  const router = useRouter();
  const pathname = usePathname();

  const showTotal: PaginationProps["showTotal"] = () =>
    `Total ${props.total} items`;

  const onChange: PaginationProps["onChange"] = (currentPage) => {
    setCurrent(currentPage);
    router.push(`${pathname}?page=${currentPage}`)
    console.log("currentPage", currentPage)
  };

  return (
    <div>
      <Pagination
        size="small"
        total={100}
        current={current}
        onChange={onChange}
        showTotal={showTotal}
        showSizeChanger
        showQuickJumper
        pageSize={props.pageSize}
      />
    </div>
  );
};
