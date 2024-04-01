import React from "react";
import { DataTable } from "./data-table";
import { AddButton } from "./add-button";

const ProductsPage = () => {
  return (
    <div className="w-full space-y-4">
      <div className="w-full flex justify-end items-center">
        <AddButton />
      </div>
      <div>
        <DataTable />
      </div>
    </div>
  );
};

export default ProductsPage;
