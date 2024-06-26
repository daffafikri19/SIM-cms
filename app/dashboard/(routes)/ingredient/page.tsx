import React from "react";
import axios from "axios";
import Link from "next/link";
import { DataTable } from "./table-data";
import { ServerProps } from "@/types";
import { CustomPagination } from "../../../../components/pagination";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { TableFilter } from "../../../../components/table-filter";

const fetchDataIngredient = async ({
  take,
  skip,
  search,
}: {
  take: number;
  skip: number;
  search: string | null;
}) => {
  try {
    const res = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "/api/ingredients/all",
      {
        params: {
          take,
          skip,
          search: search ? search : null,
        },
      }
    );
    return res.data.data;
  } catch (error: any) {
    if (error.response) {
      console.error(error.response.data.errorMessage);
    }
  }
};

const IngredientPage = async (props: ServerProps) => {
  const pageNumbers = Number(props.searchParams?.page || 1);
  const pageSize = Number(props.searchParams?.limit || 10);
  const searchValue = props.searchParams?.search || null;
  const take = pageSize;
  const skip = (pageNumbers - 1) * take;
  const dataIngredients = await fetchDataIngredient({
    skip: skip,
    take: take,
    search: searchValue ? searchValue : (null as any),
  });
  const ingredients = dataIngredients.result;
  const metadata = dataIngredients.metadata;

  return (
    <div className="w-full space-y-4">
      <div className="w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-2">
        <div className="w-full flex-1">
          <TableFilter
            searchTitle="Cari berdasarkan nama bahan baku"
            enableDatePicker={false}
            enableInput
          />
        </div>
        <div>
          <Link href={"/dashboard/ingredient/create"}>
            <Button type="primary" icon={<PlusOutlined />}>
              Tambah Bahan Baku
            </Button>
          </Link>
        </div>
      </div>
      <DataTable data={ingredients} />
      <div className="w-full flex items-center justify-end mt-5">
        <CustomPagination page={pageNumbers} {...metadata} limit={pageSize} />
      </div>
    </div>
  );
};

export default IngredientPage;
