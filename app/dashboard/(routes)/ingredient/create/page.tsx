import React from "react";
import { FormCreateIngredient } from "./form";
import axios from "axios";
import { message } from "antd";
import { refresher } from "@/app/api/services/refresher";

const fetchCategoryIngredients = async () => {
  try {
    const res = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/api/ingredients/category/all")
    await refresher({ path: "/dashboard/ingredient" })
    await refresher({ path: "/dashboard/ingredient/create" })
    return res.data.data
  } catch (error : any) {
    return message.error(error.response.data.message)
  }
}

const CreateIngrendientPage = async () => {
  const categoryData = await fetchCategoryIngredients();
  if (!categoryData) return [];
  
  return (
    <div>
      <FormCreateIngredient categoryData={categoryData} />
    </div>
  );
};

export default CreateIngrendientPage;
