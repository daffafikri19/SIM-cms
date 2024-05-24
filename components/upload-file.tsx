"use client";

import React, { useState } from "react";
import { Button } from "antd";
import { useLoadingContext } from "../store/use-loading";

type Props = {
  onFileSelected: (image: string) => void;
};

export const UploadFile = ({ onFileSelected }: Props) => {
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
              fileManager.default.selectFiles({
                acceptExtensions: ["png", "jpeg", "jpg"],
                isMultiple: false,
                onFinish: (files: any) => {
                  fileManager.default.upload({
                    filesOrLinks: files,
                    dirUploads: "/user-profile",
                    onFinish: (uploadedImage) => {
                      const image = uploadedImage[0]?.url || "";
                      if (image) {
                        const imageUrl = new URL(image).pathname;
                        onFileSelected(imageUrl);
                        setLoading(false);
                      }
                    },
                    onFail(error) {
                        setLoading(false)
                    },
                  });
                },
              });
            },
          }
        );
      });
    } catch (error) {
      throw new Error("Terjadi kesalahan server saat membuka file manager");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      size="large"
      htmlType="button"
      loading={loading}
      disabled={loading}
      type="dashed"
      onClick={openFileManager}
    >
      Upload Gambar
    </Button>
  );
};
