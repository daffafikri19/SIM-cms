import React from "react";
import { DataTable } from "./table-data";
import { ServerProps } from "@/types";
import { CustomPagination } from "../../../../components/pagination";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Link from "next/link";
import { TableFilter } from "../../../../components/table-filter";
import { fetchDataProduct } from "@/app/api/mutations/products";


const ProductsPage = async (props: ServerProps) => {
  const pageNumbers = Number(props.searchParams?.page || 1);
  const pageSize = Number(props.searchParams?.limit || 10);
  const searchValue = props.searchParams?.search || null;
  const startDateValue = props.searchParams?.startDate || null;
  const endDateValue = props.searchParams?.endDate || null;
  const take = pageSize;
  const skip = (pageNumbers - 1) * take;
  const dataProducts = await fetchDataProduct({
    skip: skip,
    take: take,
    search: searchValue ? searchValue : (null as any),
    startDate: startDateValue ? startDateValue : (null as any),
    endDate: endDateValue ? endDateValue : (null as any),
  });
  const products = dataProducts.result;
  const metadata = dataProducts.metadata;

  return (
    <div className="w-full space-y-4">
      <div className="w-full flex flex-col-reverse lg:flex-row items-center justify-between gap-2">
        <div className="w-full flex-1">
          <TableFilter
            searchTitle="Cari berdasarkan nama produk"
            enableDatePicker
          />
        </div>
        <div>
          <Link href={"/dashboard/product/create"}>
            <Button type="primary" icon={<PlusOutlined />}>
              Tambah Produk
            </Button>
          </Link>
        </div>
      </div>
      <DataTable data={products} />
      <div className="w-full flex items-center justify-end mt-5">
        <CustomPagination page={pageNumbers} {...metadata} limit={pageSize} />
      </div>
    </div>
  );
};

export default ProductsPage;
