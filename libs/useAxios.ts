import { useAuthContext } from "@/store/use-auth";
import { useToken } from "@/store/use-token";
import axios from "axios";
import { redirect } from "next/navigation";

const { exp } = useAuthContext();
const { setToken } = useToken();

export const useAxios = axios.create();

useAxios.interceptors.request.use(async (config): Promise<any> => {
    const currentDate = new Date();
    if(!exp) {
        redirect("/")
    }
    if(exp * 1000 < currentDate.getTime()) {
        const res = await useAxios.get(process.env.NEXT_PUBLIC_BACKEND_SERVER_URL + "/api/auth/token");
        const token = res.data.data.token
        config.headers.Authorization = `Bearer ${token}`
        setToken(token)
    }
    return config
}, (error) => {
    return Promise.reject(error);
})