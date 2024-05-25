import React from 'react'
import { FormEdit } from './form';
import { fetchRoleData, fetchUserDataById } from '@/app/api/mutations/users';
import { redirect } from 'next/navigation';
import { parseCookie } from '@/app/api/services/cookies';

const AddUserPage = async () => {
  const roledata = await fetchRoleData();
  const session = await parseCookie();

  const userData = await fetchUserDataById({ id: session.hashedToken.userid });
  
  if(!roledata) return [];
  // if(!session?.user.id) {
  //   redirect("/")
  // }
  return (
    <div>
      <FormEdit userData={userData} roleData={roledata} />
    </div>
  )
}

export default AddUserPage