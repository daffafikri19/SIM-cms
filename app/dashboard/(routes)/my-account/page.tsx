import { Button, Image, Typography } from "antd";
import React from "react";
import { EditOutlined } from "@ant-design/icons";
import { parseCookie } from "@/app/api/services/cookies";
import { redirect } from "next/navigation";
import { FormUpdateUserData } from "./form-update";
import axios from "axios";

const fetchUserData = async ({ userid } : { userid: string }) => {
  try {
    const res = await axios.post(process.env.NEXT_PUBLIC_API_URL + `/api/user/get/${userid}`, {
      id: userid
    });

    return res.data.data
  } catch (error : any) {
    if(error.response) {
      console.error(error.response.data.message)
    }
  }
}

const MyAccountPage = async () => {
  const session = await parseCookie();
  const userdata = await fetchUserData({ userid: session.hashedToken.userid })
  if(!session.hashedToken.userid) {
    redirect("/")
  }
  return (
    <div className="w-full h-full">
      <FormUpdateUserData userdata={userdata} />
    </div>
  );
};  

export default MyAccountPage
