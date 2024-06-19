"use client";

import { UseFilterRouter } from "@/store/use-filter";
import { DatePicker, Input } from "antd";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDebounceCallback } from "usehooks-ts";
import type { SearchProps } from "antd/es/input/Search";

type props = {
  searchTitle?: string;
  enableDatePicker: boolean;
  enableInput: boolean;
  inputClassName?: string;
  datePickerClassName?: string;
};
export const TableFilter = ({
  searchTitle,
  enableDatePicker,
  enableInput,
  inputClassName,
  datePickerClassName
}: props) => {
  const router = useRouter();
  const pathname = usePathname();

  const {
    page,
    limit,
    search,
    setSearch,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  } = UseFilterRouter();
  const debouncedSearchFilter = useDebounceCallback(setSearch, 1000);

  const onSearch: SearchProps["onSearch"] = (value) => {
    setSearch(value);
    debouncedSearchFilter(value);
  };

  useEffect(() => {
    router.push(
      `${pathname}?page=${page}&limit=${limit}${
        search ? `&search=${search}` : ""
      }${startDate ? `&startDate=${startDate}` : ""}${
        endDate ? `&endDate=${endDate}` : ""
      }`
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, search, startDate, endDate]);

  return (
    <div className="flex flex-col lg:flex-row items-center gap-2">
      {enableInput ? (
        <Input.Search
          className={`w-full lg:!w-1/2 ${inputClassName}`}
          placeholder={searchTitle}
          defaultValue={search}
          onChange={(event) => debouncedSearchFilter(event.target.value)}
          onSearch={onSearch}
        />
      ) : null}

      {enableDatePicker ? (
        <DatePicker.RangePicker
          className={`w-full lg:!w-1/2 ${datePickerClassName}`}
          allowClear
          onChange={(value, dateString) => {
            setStartDate(dateString[0]);
            setEndDate(dateString[1]);
          }}
        />
      ) : null}
    </div>
  );
};
