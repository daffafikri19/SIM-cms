import React from "react";
import { parseCookie } from "@/app/api/services/cookies";
import { redirect } from "next/navigation";
import { FormIngredient } from "./form";
import axios from "axios";

const fetchAllIngredients = async () => {
  try {
    const res = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "/api/ingredients/all/report"
    );
    return res.data.data;
  } catch (error: any) {
    if (error.response) {
      console.error(error.response.data.message);
    }
  }
};

const CreateReportIngredientPage = async () => {
  const ingredients = await fetchAllIngredients();
  const session = await parseCookie();

  if (!ingredients) return [];

  if (!session.hashedToken.userid) {
    redirect("/");
  }

  return (
    <div>
      <FormIngredient data={ingredients} session={session.hashedToken} />
    </div>
  );
};

export default CreateReportIngredientPage;
