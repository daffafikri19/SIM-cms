import React from 'react'
import { FormEdit } from './form';
import { fetchRoleData, fetchUserDataById } from '@/app/api/mutations/users';
import { redirect } from 'next/navigation';

const AddUserPage = async () => {
  const roledata = await fetchRoleData();

  const userData = await fetchUserDataById({ id: 'clw3jg4es0000j3yxoki4jpgo' });
  
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