"use client";

import React, { useEffect, useState, useTransition } from "react";
import { App, Button, Menu, Modal, Switch, Typography } from "antd";
import { LockOutlined } from "@ant-design/icons";
import {
  AppstoreOutlined,
  SettingOutlined,
  CompassOutlined,
  FileOutlined,
  UserOutlined,
  ProductOutlined,
  FileTextOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";
import { MenuProps, UserRole } from "@/types";
import axios from "axios";
import { refresher } from "@/app/api/services/refresher";

type props = {
  roleid: number;
};

export const ModalPermission = ({ roleid }: props) => {
  const [openModal, setOpenModal] = useState(false);
  const [roledata, setRoledata] = useState<UserRole>();
  const { message } = App.useApp();
  const [pending1, startTransition1] = useTransition();
  const [pending2, startTransition2] = useTransition();

  const handleOpenModal = () => {
    startTransition1(async () => {
      try {
        const res = await axios.post(
          process.env.NEXT_PUBLIC_API_URL + `/api/user/role/get/${roleid}`,
          {
            id: roleid,
          }
        );

        const savedAccess = await axios.post(
          process.env.NEXT_PUBLIC_API_URL + `/api/access/get/${roleid}`,
          {
            roleid: roleid,
          }
        );

        if(savedAccess.data.data.length > 0) {
          setSwitchValues(savedAccess.data.data)
        } 
        setOpenModal(true);
        setRoledata(res.data.data);
        return res.data.data;
      } catch (error: any) {
        if (error.response) {
          message.error(error.response.data.message);
        }
      }
    });
  };
  const accessList: MenuProps = [
    {
      label: "Beranda",
      key: "1",
      icon: <CompassOutlined />,
      href: "/dashboard",
    },
    {
      label: "Produk",
      key: "2",
      icon: <AppstoreOutlined />,
      children: [
        { label: "Daftar Produk", key: "21", href: "/dashboard/product" },
        {
          label: "Kategori Produk",
          key: "22",
          href: "/dashboard/product/category",
        },
      ],
    },
    {
      label: "Bahan Baku",
      key: "3",
      icon: <ProductOutlined />,
      children: [
        {
          label: "Daftar Bahan Baku",
          key: "31",
          href: "/dashboard/ingredient",
        },
        {
          label: "Kategori Bahan Baku",
          key: "32",
          href: "/dashboard/ingredient/category",
        },
      ],
    },
    {
      label: "Resep",
      key: "4",
      icon: <FileTextOutlined />,
      href: "/dashboard/recipe",
    },
    {
      label: "Laporan",
      key: "5",
      icon: <FileDoneOutlined />,
      children: [
        {
          label: "Bahan Baku",
          key: "51",
          href: "/dashboard/report/ingredient",
        },
        { label: "Keuangan", key: "52", href: "/dashboard/report/sales" },
        { label: "Stok", key: "53", href: "/dashboard/report/stock" },
      ],
    },
    {
      label: "Kelola Pengguna",
      key: "6",
      icon: <UserOutlined />,
      children: [
        {
          label: "Daftar Karyawan",
          key: "61",
          href: "/dashboard/manage-user",
        },
        {
          label: "Perizinan Akses",
          key: "62",
          href: "/dashboard/manage-user/permission",
        },
      ],
    },
    {
      label: "Penyimpanan File",
      key: "7",
      icon: <FileOutlined />,
      href: "/dashboard/file-storage",
    },
    {
      label: "Pengaturan Akun",
      key: "8",
      icon: <SettingOutlined />,
      href: "/dashboard/settings",
    },
  ];

  const [switchValues, setSwitchValues] = useState<any>([]);
  const excludedKeys = ["2", "3", "5", "6"];
  const [initialSwitchValues, setInitialSwitchValues] = useState([]); // Store initial values

  useEffect(() => {
    const initialValues: any = [];
    const populateInitialValues = (items: any) => {
      items.forEach((item: any) => {
        if (!excludedKeys.includes(item.key)) {
          initialValues.push({ key: item.key, value: false });
        }
        if (item.children) {
          populateInitialValues(item.children);
        }
      });
    };
    populateInitialValues(accessList);
    setSwitchValues(initialValues);
    setInitialSwitchValues(initialValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {}, [switchValues]);

  const handleSwitchChange = (key: string, checked: boolean) => {
    if (excludedKeys.includes(key)) return;
    setSwitchValues((prevValues: any) =>
      prevValues.map((item: any) =>
        item.key === key ? { ...item, value: checked } : item
      )
    );
  };

  const handleCheckAll = () => {
    setSwitchValues((prevValues: any) =>
      prevValues.map((item: any) =>
        excludedKeys.includes(item.key) ? item : { ...item, value: true }
      )
    );
  };

  const handleReset = () => {
    setSwitchValues(initialSwitchValues);
  };

  const renderSubMenu = (item: any) => (
    <Menu.SubMenu key={item.key} icon={item.icon} title={item.label}>
      {item.children &&
        item.children.map((child: any) => (
          <Menu.Item key={child.key}>
            <div
              data-href={child.href}
              className="w-full flex items-center justify-between"
            >
              <Typography>{child.label}</Typography>
              <Switch
                checked={
                  switchValues.find((sv: any) => sv.key === child.key)?.value ||
                  false
                }
                onChange={(checked) => handleSwitchChange(child.key, checked)}
              />
            </div>
          </Menu.Item>
        ))}
    </Menu.SubMenu>
  );

  const handleSubmitData = () => {
    const payload = {
      roleid: roledata?.id,
      permissions: switchValues,
    };
    startTransition2(async () => {
      try {
        const res = await axios.post(
          process.env.NEXT_PUBLIC_API_URL + "/api/access/create-or-update",
          payload
        );

        message.success(res.data.message);
        await refresher({ path: "/dashboard/manage-user/permission" })
        await refresher({ path: "/dashboard/manage-user" })
        setOpenModal(false)
        return res.data.data;
      } catch (error: any) {
        if (error.response) {
          message.error(error.response.data.message);
          setOpenModal(false)
        }
      }
    });
  };

  return (
    <>
      <Button
        icon={<LockOutlined />}
        type="dashed"
        onClick={handleOpenModal}
        loading={pending1}
        disabled={pending1}
      />
      <Modal
        title={
          <p>
            Akses pada role <b>{roledata?.name}</b>, akan ditentukan dari
            pengaturan ini
            <br /> Menyala: Diizinkan, <br /> Mati: Tidak diizinkan
          </p>
        }
        onCancel={() => setOpenModal(false)}
        open={openModal}
        width={1000}
        onOk={handleSubmitData}
        okText="Simpan"
        cancelText="Batal"
        confirmLoading={pending2}
      >
        <div className="w-full flex items-center justify-end gap-3 mb-5">
          <Button size="small" type="primary" onClick={handleCheckAll}>
            Ceklis Semua
          </Button>
          <Button size="small" type="dashed" onClick={handleReset}>
            Reset
          </Button>
        </div>

        <Menu
          mode="inline"
          style={{ top: 20 }}
          defaultOpenKeys={["1", "2", "3", "4", "5", "6", "7", "8"]}
        >
          {accessList.map((item) =>
            item.children ? (
              renderSubMenu(item)
            ) : (
              <Menu.Item key={item.key} icon={item.icon}>
                <div
                  data-href={item.href}
                  className="w-full flex items-center justify-between"
                >
                  <Typography>{item.label}</Typography>
                  <Switch
                    checked={
                      switchValues.find((sv: any) => sv.key === item.key)
                        ?.value || false
                    }
                    onChange={(checked) =>
                      handleSwitchChange(item.key, checked)
                    }
                  />
                </div>
              </Menu.Item>
            )
          )}
        </Menu>
      </Modal>
    </>
  );
};
