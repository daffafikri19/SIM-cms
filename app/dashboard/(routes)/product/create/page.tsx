import React from "react";
import { FormCreateProduct } from "./form";
import { fetchCategoryProduct } from "@/app/api/mutations/products";


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
