import React from "react";
import { DataTable } from "./data-table";
import { parseCookie } from "@/app/api/services/cookies";
import { redirect } from "next/navigation";
import { PlusOutlined } from "@ant-design/icons";
import { CustomPagination } from "@/components/pagination";
import { TableFilter } from "@/components/table-filter";
import { Button } from "antd";
import Link from "next/link";
import { ServerProps } from "@/types";
import axios from "axios";

const fetchAllRecipe = async ({
  take,
  skip,
  search,
}: {
  take: number;
  skip: number;
  search: string | null;
}) => {
  const result = await axios.get(
    process.env.NEXT_PUBLIC_API_URL + "/api/recipe/all",
    {
      params: {
        take,
        skip,
        search: search ? search : null,
      },
    }
  );

  return result.data.data;
};

const RecipePage = async (props: ServerProps) => {
  const pageNumbers = Number(props.searchParams?.page || 1);
  const pageSize = Number(props.searchParams?.limit || 10);
  const searchValue = props.searchParams?.search || null;
  const take = pageSize;
  const skip = (pageNumbers - 1) * take;

  const dataRecipe = await fetchAllRecipe({
    skip: skip,
    take: take,
    search: searchValue ? searchValue : (null as any),
  });
  const recipes = dataRecipe.result;
  const metadata = dataRecipe.metadata;

  const session = await parseCookie();
  if (!session.hashedToken.userid) {
    redirect("/");
  }

  if (!recipes) return [];
  
  return (
    <div className="w-full space-y-4">
      <div className="w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-2">
        <div className="w-full flex-1">
          <TableFilter
            searchTitle="Cari berdasarkan nama resep"
            enableInput
            enableDatePicker={false}
          />
        </div>
        <div>
          <Link href={"/dashboard/recipe/create"}>
            <Button type="primary" icon={<PlusOutlined />}>
              Buat Resep
            </Button>
          </Link>
        </div>
      </div>
      <DataTable data={recipes} session={session.hashedToken} />
      <div className="w-full flex items-center justify-end mt-5">
        <CustomPagination page={pageNumbers} {...metadata} limit={pageSize} />
      </div>
    </div>
  );
};

export default RecipePage;
