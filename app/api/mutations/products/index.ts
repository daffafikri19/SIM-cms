"use server";

import { ProductProps } from "@/types";
import axios from "axios";
import { revalidatePath } from "next/cache";


export const fetchDataProduct = async ({
  take,
  skip,
  search,
  startDate,
  endDate,
}: {
  take: number;
  skip: number;
  search: string | null;
  startDate: string | null;
  endDate: string | null;
}) => {
  try {
    const res = await axios.get(
      process.env.NEXT_PUBLIC_API_URL + "/api/product/all/display",
      {
        params: {
          take,
          skip,
          search: search ? search : null,
          startDate: startDate ? startDate : null,
          endDate: endDate ? endDate : null,
        },
      }
    );
    revalidatePath("/dashboard/product");
    return res.data.data;
  } catch (error: any) {
    if (error.response) {
      return {
        message: error.response.data.message,
        status: 500
      }
    }
  }
};

export const createProduct = async ({
  name,
  picture,
  price,
  category,
  max_age,
}: ProductProps) => {
  try {
    const res = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + "/api/product/create",
      {
        name,
        picture,
        price,
        category,
        max_age,
      }
    );
    revalidatePath("/dashboard/product");
    return {
      message: res.data.message,
      status: res.status,
    };
  } catch (error: any) {
    if(error.response){
      return {
        message: error.response.data.message,
        status: 500,
      };
    }
  }
};

export const updateProduct = async ({
  id,
  name,
  picture,
  price,
  category,
  max_age,
}: { id: string } & ProductProps) => {
  try {
    const res = await axios.patch(
      process.env.NEXT_PUBLIC_API_URL + `/api/product/update/${id}`,
      {
        id,
        name,
        picture,
        price,
        category,
        max_age,
      }
    );
    revalidatePath("/dashboard/product");
    revalidatePath("/dashboard/product/edit");
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

export const deleteProduct = async ({ id }: { id: string }) => {
  try {
    const res = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + `/api/product/delete/${id}`,
      {
        id: id,
      }
    );
    revalidatePath("/dashboard/product");
    revalidatePath("/dashboard/product/edit");

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

export const fetchProductForReport = async () => {
  try {
    revalidatePath('/dashboard/product');
    revalidatePath('/dashboard/report/stock');
    revalidatePath('/dashboard/report/stock/create');
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/product/all/report", {
      cache: 'no-cache'
    })
    revalidatePath("/dashboard/product");
    const data = await res.json();
    return data;
  } catch (error: any) {
    if (error.response) {
      return {
        message: error.response.data.message,
        status: 500,
      };
    }
  }
}

export const fetchReportShiftYesterday = async () => {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/report/stock/yesterday", {
      cache: 'no-cache'
    });
    const data = await res.json();
    return data.data
  } catch (error: any) {
    if (error.response) {
      return {
        message: error.response.data.message,
        status: 500,
      };
    }
  }
}

export const fetchCategoryProduct = async () => {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/api/product/category/all",
      {
        cache: "no-cache",
      }
    );
    revalidatePath("/dashboard/product");
    const category = await res.json();
    return category.data;
  } catch (error: any) {
    if (error.response) {
      return {
        message: error.response.data.message,
        status: 500,
      };
    }
  }
};

export const fetchCategoryProductId = async (id: number) => {
  try {
    const res = await axios.post(process.env.NEXT_PUBLIC_API_URL + `/api/product/category/get/${id}`, {
      id: id
    });
    revalidatePath("/dashboard/product");
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

export const createCategoryProduct = async ({ name }: { name: string }) => {
  try {
    const res = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + "/api/product/category/create",
      {
        name: name,
      }
    );

    revalidatePath("/dashboard/product/create");
    revalidatePath("/dashboard/product/category");
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

export const editCategoryProduct = async ({ id, name }: { id: number, name: string }) => {
  try {
    const res = await axios.patch(
      process.env.NEXT_PUBLIC_API_URL + `/api/product/category/update/${id}`,
      {
        id: id,
        name: name,
      }
    );

    revalidatePath("/dashboard/product/create");
    revalidatePath("/dashboard/product/category");
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

export const deleteCategoryProduct = async ({ id }: { id: number }) => {
  try {
    const res = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + `/api/product/category/delete/${id}`,
      {
        id,
      }
    );
    revalidatePath("/dashboard/product/category");
    revalidatePath("/dashboard/product");
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


