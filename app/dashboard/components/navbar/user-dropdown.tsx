import React from "react";
import { Button, Dropdown, MenuProps } from "antd";
import { SettingOutlined, LogoutOutlined } from "@ant-design/icons";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        1st menu item
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        2nd menu item
      </a>
    ),
  },
  {
    key: "3",
    label: (
      <div className="flex items-center space-x-2">
        <LogoutOutlined />
        <p>Logout</p>
      </div>
    ),
  },
];

export const UserDropdown = () => {
  return (
    <Dropdown menu={{ items }} placement="bottom">
      <Button
        size="large"
        type="text"
        icon={<SettingOutlined />}
      />
    </Dropdown>
  );
};
