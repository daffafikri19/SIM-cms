"use client"

import React from "react";
import { Button } from "antd";

type Props = {
  onFileSelected: (image: string) => void;
};

export const UploadFile = ({ onFileSelected }: Props) => {
  const openFileManager = () => {
    import("@flmngr/flmngr-react").then((fileManager) => {
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
                  console.log("file image url", imageUrl);
                  onFileSelected(imageUrl);
                }
              },
            });
          },
        }
      );
    });
  };

  return (
    <Button size="large" type="dashed" onClick={openFileManager}>
      Buka File Manager
    </Button>
  );
};
