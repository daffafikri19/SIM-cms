"use server"

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
import { jwtDecode } from "jwt-decode";
import { authProps } from '@/types';

export async function setCookie({ value } : { value: string }) {
    const cookie = cookies();

    cookie.set('funBreadToken', value);

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