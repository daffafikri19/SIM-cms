"use client";

import React, { useEffect, useState } from "react";
import { Pagination, PaginationProps } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { UseFilterRouter } from "@/store/use-filter";

type props = {
  page?: number;
  totalPages: number;
  totalData: number;
  hasNextPage: boolean;
  limit: number;
};

export const CustomPagination = (props: props) => {
  const router = useRouter();
  const pathname = usePathname();
  const { page, setPage, limit, setLimit } = UseFilterRouter();

  const showTotal: PaginationProps["showTotal"] = () =>
    `Total produk : ${props.totalData}`;

  const onChange: PaginationProps["onChange"] = (currentPage) => {
    setPage(currentPage);
  };

  const onPageSizeChange: PaginationProps["onShowSizeChange"] = (
    currentPage: number,
    pageSize: number
  ) => {
    setPage(currentPage);
    setLimit(pageSize);
    router.push(`${pathname}?page=${currentPage}&limit=${pageSize}`);
  };

  useEffect(() => {
    router.push(`${pathname}?page=${page}&limit=${limit}`);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, setPage, limit, setLimit]);

  return (
    <div>
      <Pagination
        size="small"
        total={props.totalData}
        showTotal={showTotal}
        current={page}
        onChange={onChange}
        onShowSizeChange={onPageSizeChange}
        pageSizeOptions={[10, 20, 30, 40, 50, 75, 100]}
        showSizeChanger
        showQuickJumper
      />
    </div>
  );
};
