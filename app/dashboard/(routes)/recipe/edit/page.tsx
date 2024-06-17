import React from "react";
import axios from "axios";
import { FormEditRecipe } from "./form-recipe";
import { ServerProps } from "@/types";
import { redirect } from "next/navigation";

const fetchRecipeById = async ({ id }: { id: number }) => {
    try {
      const res = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + `/api/recipe/get/${id}`,
        {
          id: id,
        }
      );
      return res.data.data;
    } catch (error: any) {
      if (error.response) {
        console.error(error.response.data.errorMessage);
      }
    }
};

const fetchIngredients = async () => {
    try {
      const res = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/ingredients/all/recipe");
      return res.data.data
    } catch (error : any) {
      if(error.response) {
        console.error(error)
        console.error(error.response.data.message)
      }
    }
  }

const EditRecipePage = async (props: ServerProps) => {
  const recipe_id = props.searchParams?.id as string;
  const dataRecipe = await fetchRecipeById({ id: Number(recipe_id) });
  const ingredients = await fetchIngredients();
  if(!dataRecipe) {
    redirect("/dashboard/recipe")
  };

  return (
    <div>
      <FormEditRecipe dataRecipe={dataRecipe} ingredientsData={ingredients} />
    </div>
  );
};

export default EditRecipePage;
