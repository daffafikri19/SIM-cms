import React from "react";
import { FormCreateRecipe } from "./form-recipe";
import axios from "axios";

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
const CreateRecipePage = async () => {
  const dataIngredients = await fetchIngredients();
  if(!dataIngredients) return [];

  return (
    <div>
      <FormCreateRecipe ingredientsData={dataIngredients} />
    </div>
  );
};

export default CreateRecipePage;
