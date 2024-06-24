import React from 'react'
import { FormRegister } from './form-register'
import { parseCookie } from '@/app/api/services/cookies';
import { redirect } from 'next/navigation';
import { refresher } from '@/app/api/services/refresher';

const fetchRoleData = async () => {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/api/user/role/all",
      {
        cache: "no-cache",
      }
    );

    await refresher({ path: "/dashboard/manage-user" });
    const data = await res.json();
    return data.data;
  } catch (error: any) {
    if (error.response) {
      return {
        message: error.response.data.message,
        status: 500,
      };
    }
  }
};


const AddUserPage = async () => {
  const { hashedToken } = await parseCookie();
  const roledata = await fetchRoleData();
  
  if(!roledata) return [];
  if(hashedToken.role !== "Owner") {
    redirect("/dashboard")
  }

  return (
    <div>
      <FormRegister roleData={roledata} />
    </div>
  )
}

export default AddUserPage