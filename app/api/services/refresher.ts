"use server"

import { revalidatePath } from "next/cache"

export const refresher = async ({ path }: { path: string }) => {
    await revalidatePath(path)
    return
}