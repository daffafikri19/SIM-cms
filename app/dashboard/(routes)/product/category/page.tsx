import React from "react";
import { DataTable } from "./data-table";
import { fetchCategoryProduct } from "@/app/api/mutations/products";
import { AddModal } from "./add-modal";

const CategoryProductPage = async () => {
  const categoryData = await fetchCategoryProduct();

  return (
    <div className="w-full">
      <AddModal />
      <DataTable data={categoryData} />
    </div>
  );
};

export default CategoryProductPage;
