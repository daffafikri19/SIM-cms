import React from "react";
import { FormCreateProduct } from "./form";
import { refresher } from "@/app/api/services/refresher";

const fetchCategoryProduct = async () => {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/api/product/category/all",
      {
        cache: "no-cache",
      }
    );
    await refresher({ path: '/dashboard/product/' });
    const category = await res.json();
    return category.data;
  } catch (error: any) {
    if (error.response) {
      console.error(error.response.data.message)
    }
  }
};

const AddProductPage = async () => {
  const categoryData = await fetchCategoryProduct();

  if (!categoryData) return [];
  return (
    <div>
      <FormCreateProduct categoryData={categoryData} />
    </div>
  );
};

export default AddProductPage;
