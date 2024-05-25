"use server";

import { IngredientProps } from "@/types";
import { revalidatePath } from "next/cache";
import { parseCookie } from "../../services/cookies";
import axios from "axios";

export const fetchCategoryIngredients = async () => {
  try {
    const res = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/ingredients/category/all");
    
    return res.data.data;
  } catch (error: any) {
    if(error.response) {
      return {
        message: error.response.data.message,
        status: 500
      }
    }
  }
};

export const createIngredient = async ({ name, category, price }: IngredientProps) => {

  try {
    const res = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + "/api/ingredient/create",
      {
        name,
        category,
        price
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
  price
}: { id: number } & IngredientProps) => {
  try {
    const res = await axios.patch(
      process.env.NEXT_PUBLIC_API_URL + `/api/ingredient/update/${id}`,
      {
        id,
        name,
        category,
        price
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
  try {
    const res = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + `/api/ingredient/delete/${id}`,
      {
        id: id,
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
  try {
    const res = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + "/api/ingredient/category/create",
      {
        name: name,
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

export const fetchCategoryIngredientId = async (id: number) => {
  try {
    const res = await axios.post(process.env.NEXT_PUBLIC_API_URL + `/api/ingredient/category/get/${id}`, {
      id: id
    });
    revalidatePath("/dashboard/ingredient");
    return res.data
  } catch (error: any) {
    if (error.response) {
      return {
        message: error.response.data.message,
        status: 500,
      };
    }
  }
}

export const editCategoryIngredient = async ({ id, name } : { id: number, name: string }) => {
  try {
    const res = await axios.patch(process.env.NEXT_PUBLIC_API_URL + `/api/ingredient/category/update/${id}`, {
      id,
      name
    });
    revalidatePath("/dashboard/ingredient/category");
    revalidatePath("/dashboard/ingredient");
    return {
      message: res.data.message,
      status: 200
    }
  } catch (error : any) {
    if (error.response) {
      return {
        message: error.response.data.message,
        status: 500,
      };
    }
  }
};

export const deleteCategoryIngredient = async ({ id }: { id: number }) => {
  try {
    const res = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + `/api/ingredient/category/delete/${id}`,
      {
        id,
      }
    );
    revalidatePath("/dashboard/ingredient/category");
    revalidatePath("/dashboard/ingredient");
    return {
      message: res.data.message,
      status: 200
    }
  } catch (error: any) {
    if (error.response) {
      return {
        message: error.response.data.message,
        status: 500,
      };
    }
  }
};
