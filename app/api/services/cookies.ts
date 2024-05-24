"use server"

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
import { jwtDecode } from "jwt-decode";
import { authProps } from '@/types';

export async function parseCookie() {
    const cookie = cookies();

    const accesstoken = cookie.get('funBreadToken')?.value;
    if(!accesstoken) {
        redirect("/")
    }

    const hashedToken = jwtDecode(accesstoken);
    return {
        hashedToken: hashedToken as authProps,
        token: accesstoken
    }
}