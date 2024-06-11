"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";

export const fetchReportStock = async ({
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
      process.env.NEXT_PUBLIC_API_URL + "/api/report/stock",
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
    revalidatePath("/dashboard/report/stock");
    return res.data.data;
  } catch (error: any) {
    if (error.response) {
      return {
        message: error.response.data.message,
        status: 500,
      };
    }
  }
};