import React from "react";
import { DataTable } from "./data-table";
import { AddModal } from "./add-modal";
import { fetchCategoryIngredients } from "@/app/api/mutations/ingredients";

const CategoryIngredientPage = async () => {
  const categoryData = await fetchCategoryIngredients();

  return (
    <div className="w-full">
      <AddModal />
      <DataTable data={categoryData} />
    </div>
  );
};

export default CategoryIngredientPage;
