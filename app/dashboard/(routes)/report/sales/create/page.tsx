import React from 'react'
import { FormCreate } from './form'
import { parseCookie } from '@/app/api/services/cookies'
import { redirect } from 'next/navigation';

const CreateReportSalesPage = async () => {
  const session = await parseCookie();
  if(!session.hashedToken) {
    redirect("/")
  }
  return (
    <div>
        <FormCreate session={session.hashedToken} />
    </div>
  )
}

export default CreateReportSalesPage