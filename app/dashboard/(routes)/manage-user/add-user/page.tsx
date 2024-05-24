import React from 'react'
import { FormRegister } from './form-register'
import { fetchRoleData } from '@/app/api/mutations/users';

const AddUserPage = async () => {

  const roledata = await fetchRoleData();
  
  if(!roledata) return [];
  return (
    <div>
      <FormRegister roleData={roledata} />
    </div>
  )
}

export default AddUserPage