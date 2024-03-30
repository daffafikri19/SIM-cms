"use client";

import React from "react";
import { Switch } from "antd";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";
import { useThemeContext } from "@/store/use-theme";

export const ThemeSwicther = () => {

  const { isDarkMode, setIsDarkMode } = useThemeContext();

  const changeTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Switch onClick={changeTheme} checkedChildren="Light" unCheckedChildren="Dark" />
  );
};
