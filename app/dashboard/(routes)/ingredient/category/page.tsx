import React from "react";
import { DataTable } from "./data-table";
import { AddModal } from "./add-modal";
import axios from "axios";
import { refresher } from "@/app/api/services/refresher";

const fetchCategoryIngredients = async () => {
  try {
    const res = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/ingredients/category/all")
    await refresher({ path: "/dashboard/ingredient" })
    await refresher({ path: "/dashboard/ingredient/create" })
    return res.data.data
  } catch (error : any) {
    if(error.response){
      console.error(error.response.data.message)
    }
  }
}

const CategoryIngredientPage = async () => {
  const categoryData = await fetchCategoryIngredients();
  if(!categoryData) return []

  return (
    <div className="w-full">
      <AddModal />
      <DataTable data={categoryData} />
    </div>
  );
};

export default CategoryIngredientPage;
