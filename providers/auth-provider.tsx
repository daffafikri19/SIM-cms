"use client";

import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { App, ConfigProvider, theme } from "antd";
import { useThemeContext } from "@/store/use-theme";

type props = {
  children: React.ReactNode;
};

const AuthConfigProvider = ({ children }: props) => {
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const { isDarkMode, setIsDarkMode } = useThemeContext();

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#f97316",
        },
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      <App>
        <AntdRegistry>{children}</AntdRegistry>
      </App>
    </ConfigProvider>
  );
};

export default AuthConfigProvider;
