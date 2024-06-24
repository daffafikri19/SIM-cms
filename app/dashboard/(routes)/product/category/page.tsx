import React from "react";
import { DataTable } from "./data-table";
import { AddModal } from "./add-modal";
import { refresher } from "@/app/api/services/refresher";
import { TableFilter } from "@/components/table-filter";
import axios from "axios";
import { ServerProps } from "@/types";

const fetchCategoryProduct = async ({ search } : { search: string | null }) => {
  try {
    const res = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/product/category/all", {
      params: {
        search: search ? search : null,
      }
    });
    await refresher({ path: "/dashboard/product/" });
    
    return res.data.data;
  } catch (error: any) {
    if (error.response) {
      return {
        message: error.response.data.message,
        status: 500,
      };
    }
  }
};

const CategoryProductPage = async (props: ServerProps) => {
  const searchValue = props.searchParams?.search || null;
  const categoryData = await fetchCategoryProduct({ search: searchValue ? searchValue : (null as any) });

  return (
    <div className="w-full">
      <div className="w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-2 mb-5">
        <div className="w-full flex-1">
        <TableFilter
          searchTitle="Cari berdasarkan nama kategori"
          enableDatePicker={false}
          enableInput
        />
        </div>
        <div className="flex items-center">
          <AddModal />
        </div>
      </div>
      <DataTable data={categoryData} />
    </div>
  );
};

export default CategoryProductPage;
