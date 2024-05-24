"use server";

import { IngredientProps } from "@/types";
import { revalidatePath } from "next/cache";
import { parseCookie } from "../../services/cookies";
import axios from "axios";

export const fetchCategoryIngredients = async () => {
  const { token } = await parseCookie()
  try {
    const res = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/ingredients/category/all", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    return res.data;
  } catch (error: any) {
    if(error.response) {
      return {
        message: error.response.data.message,
        status: 500
      }
    }
  }
};

export const createIngredient = async ({ name, category }: IngredientProps) => {
  const { token } = await parseCookie()

  try {
    const res = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + "/api/ingredient/create",
      {
        name,
        category,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    revalidatePath("/dashboard/ingredient");
    return {
      message: res.data.message,
      status: res.status,
    };
  } catch (error: any) {
    console.log(error);
    if(error.message) {
      return {
        message: error.response.data.message,
        status: 500,
      };
    }
  }
};

export const updateIngredient = async ({
  id,
  name,
  category,
}: { id: number } & IngredientProps) => {
  const { token } = await parseCookie()
  try {
    const res = await axios.patch(
      process.env.NEXT_PUBLIC_API_URL + `/api/ingredient/update/${id}`,
      {
        id,
        name,
        category,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    revalidatePath("/dashboard/ingredient");
    revalidatePath("/dashboard/ingredient/edit");
    return {
      message: res.data.message,
      status: res.status,
    };
  } catch (error: any) {
    if(error.response) {
      return {
        message: error.response.data.message,
        status: 500,
      };
    }
  }
};

export const deleteIngredient = async ({ id }: { id: number }) => {
  const { token } = await parseCookie()
  try {
    const res = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + `/api/ingredient/delete/${id}`,
      {
        id: id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    revalidatePath("/dashboard/ingredient");
    revalidatePath("/dashboard/ingredient/edit");

    return {
      message: res.data.message,
      status: res.status,
    };
  } catch (error: any) {
    if(error.response) {
      return {
        message: error.response.data.message,
        status: 500,
      };
    }
  }
};

export const createCategoryIngredient = async ({ name }: { name: string }) => {
  const { token } = await parseCookie()
  try {
    const res = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + "/api/ingredient/category/create",
      {
        name: name,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    revalidatePath("/dashboard/ingredient/create");
    revalidatePath("/dashboard/ingredient/category");
    return {
      message: res.data.message,
      status: res.status,
    };
  } catch (error: any) {
    if (error.response) {
      return {
        message: error.response.data.message,
        status: 500,
      };
    }
  }
};

export const editCategoryIngredient = () => {};

export const deleteCategoryIngredient = async ({ id }: { id: number }) => {
  const { token } = await parseCookie()
  try {
    const res = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + `/api/ingredient/category/delete/${id}`,
      {
        id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    revalidatePath("/dashboard/ingredient/category");
    revalidatePath("/dashboard/ingredient");
    return res.data;
  } catch (error: any) {
    if (error.response) {
      return {
        message: error.response.data.message,
        status: 500,
      };
    }
  }
};
