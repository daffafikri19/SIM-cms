"use client";

import React, { useEffect, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Button, theme, Card, Spin } from "antd";
import { DashboardNavbar } from "../../components/navbar";
import { SidebarMenu } from "../../components/sidebar/sidebar-menu";
import { BrandLogo } from "../../components/navbar/brand-logo";
import { useSidebar } from "@/store/use-sidebar";
import { useMediaQuery } from "usehooks-ts";
import { BreadCrumb } from "../../components/breadcrumb";
import { authProps } from "@/types";
import { JwtPayload } from "jwt-decode";
import { UseAuth } from "@/store/use-auth";

type props = {
  children: React.ReactNode;
  session?: authProps & JwtPayload;
};

const { Header, Sider, Content } = Layout;
const DashboardLayoutWrapper = ({ children, session }: props) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [mounted, setMounted] = useState(false);
  const matches = useMediaQuery("(max-width: 800px)");
  const { setUserid, setName, setEmail, setRole, setProfilePicture, setShift } =
    UseAuth();

  const { collapsed, onExpand, onCollapse } = useSidebar((state) => state);

  useEffect(() => {
    setMounted(true)
    if (matches) {
      onCollapse(!collapsed);
    } else {
      onExpand();
    }
    if (session) {
      setUserid(session.userid);
      setName(session.name);
      setEmail(session.email);
      setRole(session.role);
      setProfilePicture(session.profile_picture || null);
      setShift(session?.shift || null);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matches, onCollapse, onExpand]);

  if(!mounted) {
    return <div className="w-full min-h-screen flex items-center justify-center"><Spin size="large" /></div>
  }
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
          className="flex items-center !px-2 sticky top-0 !h-14 z-[999] shadow-md"
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
          className="p-1 md:p-2 lg:p-4 h-full overflow-scroll"
          style={{
            borderRadius: borderRadiusLG,
          }}
        >
          <BreadCrumb />
          <Card className="p-1 lg:p-2">{children}</Card>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayoutWrapper;
