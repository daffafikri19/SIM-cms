"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";

export const fetchProductForReport = async () => {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/product/all/report", {
      cache: 'no-cache'
    })
    revalidatePath("/dashboard/product");
    revalidatePath('/dashboard/report/stock/create');
    revalidatePath('/dashboard/report/stock');
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

export const fetchReportShiftYesterday = async ({ date } : { date: string }) => {
  try {
    const res = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/api/report/stock/yesterday", {
      date: date
    });
    return res.data.data;
  } catch (error: any) {
    if (error.response) {
      return {
        message: error.response.data.message,
        status: 500,
      };
    }
  }
}

export const fetchReportShiftToday = async () => {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/report/stock/today", {
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


