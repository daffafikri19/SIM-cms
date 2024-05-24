import { ServerProps } from "@/types";
import React from "react";
import { FormEditProduct } from "./form";
import { redirect } from "next/navigation";
import { message } from "antd";
import axios from "axios";

const fetchProductById = async ({ id }: { id: string }) => {
  try {
    const res = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + `/api/product/get/${id}`,
      {
        id: id,
      }
    );
    console.log(res.data)
    return res.data.data;
  } catch (error: any) {
    if (error.response) {
      message.error(error.response.data.message);
      console.log(error.response.data.errorMessage);
    }
  }
};

const fetchCategoryProduct = async () => {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/api/product/category/all",
      {
        cache: "no-cache",
      }
    );
    const category = await res.json();
    return category.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message);
    }
  }
};

const EditProductPage = async ({ params, searchParams }: ServerProps) => {
  const product_id = searchParams?.id as string;
  const productData = await fetchProductById({ id: product_id });
  const categoryProduct = await fetchCategoryProduct();
  if (!product_id) {
    message.warning("ID produk tidak ada");
    redirect("/dashboard/product");
  }

  return (
    <div>
      <FormEditProduct
        product_id={product_id}
        dataProduct={productData}
        categoryProduct={categoryProduct}
      />
    </div>
  );
};

export default EditProductPage;
