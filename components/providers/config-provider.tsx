"use client"

import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, theme } from "antd";
import { useThemeContext } from "@/store/use-theme";

type props = {
    children : React.ReactNode
}

const ConfigProviderWrapper = ({ children } : props) => {
  const { defaultAlgorithm, darkAlgorithm } = theme;

  const { isDarkMode, setIsDarkMode } = useThemeContext();

  return (
    <ConfigProvider theme={{
      token: {
        colorPrimary: "#f97316",
      },
      algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
    }}>
      <AntdRegistry>{children}</AntdRegistry>
    </ConfigProvider>
  );
};

export default ConfigProviderWrapper;
