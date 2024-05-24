"use client";

import { UseFilterRouter } from "@/store/use-filter";
import { DatePicker, Input } from "antd";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import type { SearchProps } from "antd/es/input/Search";

type props = {
  searchTitle: string;
  enableDatePicker: boolean;
}
export const TableFilter = ({
  searchTitle,
  enableDatePicker
} : props) => {
  const router = useRouter();
  const pathname = usePathname();

  const { page, limit, search, setSearch, startDate, setStartDate, endDate, setEndDate } = UseFilterRouter();
  const debouncedSearchFilter = useDebounceCallback(setSearch, 1000);

  const onSearch: SearchProps["onSearch"] = (value) => {
    setSearch(value);
    debouncedSearchFilter(value);
  };

  useEffect(() => {
    router.push(
      `${pathname}?page=${page}&limit=${limit}${search ? `&search=${search}` : ""}${startDate ? `&startDate=${startDate}` : ""}${endDate ? `&endDate=${endDate}` : ""}`
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, search, startDate, endDate]);

  return (
    <div className="flex flex-col lg:flex-row items-center gap-2">
      <Input.Search
        className="w-full lg:!w-1/2"
        placeholder={searchTitle}
        defaultValue={search}
        onChange={(event) => debouncedSearchFilter(event.target.value)}
        onSearch={onSearch}
      />

      {enableDatePicker ? (
        <DatePicker.RangePicker
        className="w-full lg:!w-1/2"
        allowClear
        onChange={(value, dateString) => {
            setStartDate(dateString[0])
            setEndDate(dateString[1])
        }}
      />
      ) : null}
    </div>
  );
};
