import { ServerProps } from "@/types";
import React from "react";
import { FormEditIngredient } from "./form";
import { redirect } from "next/navigation";
import { App } from "antd";
import axios from "axios";

const fetchIngredientById = async ({ id }: { id: number }) => {
  try {
    const res = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + `/api/ingredient/get/${id}`,
      {
        id: id,
      }
    );
    return res.data.data;
  } catch (error: any) {
    if (error.response) {
      console.error(error.response.data.message);
    }
  }
};

const fetchCategoryIngredient = async () => {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/api/ingredients/category/all",
      {
        cache: "no-cache",
      }
    );
    const category = await res.json();
    return category.data;
  } catch (error: any) {
    if (error.response) {
      console.error(error.response.data.message);
    }
  }
};

const EditProductPage = async ({ params, searchParams }: ServerProps) => {
  const { message } = App.useApp()
  const ingredient_id = Number(searchParams?.id);
  const ingredientData = await fetchIngredientById({ id: ingredient_id });
  const categoryProduct = await fetchCategoryIngredient();
  if (!ingredient_id) {
    message.warning("ID produk tidak ada");
    redirect("/dashboard/ingredient");
  }

  return (
    <div>
      <FormEditIngredient
        ingredient_id={ingredient_id}
        dataIngredient={ingredientData}
        categoryIngredient={categoryProduct}
      />
    </div>
  );
};

export default EditProductPage;
