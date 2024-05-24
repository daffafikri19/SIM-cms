"use client"

import React, { useState } from "react";
import { Button } from "antd";
import { useLoadingContext } from "../store/use-loading";

type Props = {
  onFileSelected: (image: string) => void;
};

export const FileManager = ({ onFileSelected }: Props) => {
  const { loading, setLoading } = useLoadingContext();

  const openFileManager = () => {
    try {
      import("@flmngr/flmngr-react").then((fileManager) => {
        setLoading(true);
        fileManager.default.load(
          {
            apiKey: `${process.env.NEXT_PUBLIC_FILE_MANAGER_API_KEY}`,
            urlFileManager: `${process.env.NEXT_PUBLIC_API_URL}/flmngr`,
            urlFiles: `${process.env.NEXT_PUBLIC_API_URL}/files`,
          },
          {
            onFlmngrLoaded: () => {
              fileManager.default.open({
                isMultiple: false,
                acceptExtensions: ["png", "jpeg", "jpg", "svg", "webp", "gif"],
                onFinish: (files: any) => {
                  const image = files[0]?.url || "";
                  if (image) {
                    const imageUrl = new URL(image).pathname;
                    onFileSelected(imageUrl);
                    setLoading(false)
                  }
                },
                onCancel: () => {
                  setLoading(false)
                }
              });
            },
          }
        );
      });
    } catch (error) {
      throw new Error("Terjadi kesalahan server saat membuka file manager")
    } finally {
      setLoading(false)
    }
  };

  return (
    <Button size="large" htmlType="button" loading={loading} disabled={loading} type="dashed" onClick={openFileManager}>
      Buka File Manager
    </Button>
  );
};
