import React from "react";
import { FormCreateIngredient } from "./form";
import { fetchCategoryIngredients } from "@/app/api/mutations/ingredients";

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
