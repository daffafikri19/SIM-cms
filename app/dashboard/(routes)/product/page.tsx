import React from "react";
import { DataTable } from "./table-data";
import { AddButton } from "./add-button";
import { ServerProps } from "@/types";
import { CustomPagination } from "../../components/pagination";

const ProductsPage = async (props: ServerProps) => {
  const params = props.searchParams?.page || 1;
  console.log(props.searchParams?.page);
  
  return (
    <div className="w-full space-y-4">
      <div className="w-full flex justify-end items-center">
        <AddButton />
      </div>
      <DataTable data={[]} />
      <div className="w-full flex items-center justify-end mt-5">
        <CustomPagination total={0} page={Number(params)} pageSize={10} />
      </div>
    </div>
  );
};

export default ProductsPage;
