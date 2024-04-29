import React from 'react'
import { Card } from 'antd'
import { FormRegister } from './form-register'
import axios from 'axios'

const AddUserPage = async () => {
  return (
    <div>
      <FormRegister roleData={[]} />
    </div>
  )
}

export default AddUserPage