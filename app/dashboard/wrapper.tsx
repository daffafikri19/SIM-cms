"use client";

import React, { useEffect, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Button, theme } from "antd";
import { DashboardNavbar } from "./components/navbar";
import { SidebarMenu } from "./components/sidebar/sidebar-menu";
import { BrandLogo } from "./components/navbar/brand-logo";
import { useSidebar } from "@/store/use-sidebar";
import { useMediaQuery } from "usehooks-ts";
import { BreadCrumb } from "./components/breadcrumb";
import { useAuthContext } from "@/store/use-auth";
import axios from "axios";
import { useToken } from "@/store/use-token";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

type props = {
  children: React.ReactNode;
  cookie: string | undefined | null;
};

const { Header, Sider, Content } = Layout;

interface decodedToken {
  id: string;
  name: string;
  email: string;
  jobdesk: string;
  phone_number: string | null;
  profile_picture: string | null;
  role: string;
  exp: number;
  iat: number;
}

const DashboardLayoutWrapper = ({ children, cookie }: props) => {
  const router = useRouter();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const {
    setId,
    setName,
    setEmail,
    setJobdesk,
    setPhoneNumber,
    setProfilePicture,
    setRole,
    setExp,
    setIat
  } = useAuthContext();
  const { token, setToken } = useToken();
  const matches = useMediaQuery("(max-width: 800px)");

  const { collapsed, onExpand, onCollapse } = useSidebar((state) => state);

  useEffect(() => {
    if (matches) {
      onCollapse(!collapsed);
    } else {
      onExpand();
    }
  }, [matches, onCollapse, onExpand]);

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const res = await axios.get(
          process.env.NEXT_PUBLIC_BACKEND_SERVER_URL + "/api/auth/token",
          {
            withCredentials: true,
          }
        );
        setToken(res.data.data.token);
        const decoded = jwtDecode(res.data.data.token) as decodedToken;
        setId(decoded.id);
        setName(decoded.name);
        setEmail(decoded.email);
        setPhoneNumber(decoded.phone_number);
        setJobdesk(decoded.jobdesk);
        setRole(decoded.role);
        setProfilePicture(decoded.profile_picture);
        setExp(decoded.exp)
        setIat(decoded.iat)
        console.log(decoded.iat)
      } catch (error : any) {
        if(error.response) {
          router.push("/");
        }
      }
    };

    refreshToken();
  }, [router]);



  return (
    <Layout className="w-full min-h-[100dvh] h-full relative">
      <div
        className="h-[100dvh] overflow-scroll sticky top-0 left-0 shadow-md"
        style={{
          background: colorBgContainer,
        }}
      >
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          collapsedWidth={50}
          style={{
            background: colorBgContainer,
          }}
          className="h-full absolute top-0 left-0 overflow-y-scroll"
        >
          <BrandLogo isCollapsed={collapsed} />
          <SidebarMenu />
        </Sider>
      </div>
      <Layout className="relative">
        <Header
          style={{ background: colorBgContainer }}
          className="flex items-center !px-2 sticky top-0 !h-14 shadow-sm"
        >
          <Button
            type="text"
            size="large"
            icon={
              collapsed ? (
                <MenuUnfoldOutlined color="white" />
              ) : (
                <MenuFoldOutlined color="white" />
              )
            }
            onClick={() => onCollapse(!collapsed)}
          />

          <DashboardNavbar />
        </Header>

        <Content
          className="p-4 h-full overflow-scroll"
          style={{
            borderRadius: borderRadiusLG,
          }}
        >
          <BreadCrumb />
          <div className="p-2">{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayoutWrapper;
