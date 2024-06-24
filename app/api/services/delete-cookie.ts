"use server"

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';

export async function deleteCookie() {
    const cookie = cookies();

    const accesstoken = cookie.delete('funBreadToken');
    if(!accesstoken) {
        redirect("/")
    }
    return accesstoken
}