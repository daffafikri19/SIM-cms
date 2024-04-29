"use client";

import React, { useEffect } from "react";
import { Spin } from "antd";
import { UseFileManager } from "@/store/use-filemanager";

const FileManagerPage = () => {
  UseFileManager({
    onFlmngrLoaded() {
      import("@flmngr/flmngr-react").then((fileManager) => {
        fileManager.default.open({
          isMultiple: null as any,
          isMaximized: true,
          showCloseButton: false,
          showMaximizeButton: false,
          // onFinish: (files: any) => {
          //   const image = files[0]?.url || "";
          //   if (image) {
          //     const imageUrl = new URL(image).pathname;
          //     console.log("file image url", imageUrl);
          //     return;
          //   }
          // },
        });
      });
    },
  });

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Spin size="large" />
    </div>
  );
};

export default FileManagerPage;
