"use client";

import React, { useState } from "react";
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
        });
      });
    },
  });

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="mt-10">
       <Spin size="large" />
      </div>
    </div>
  );
};

export default FileManagerPage;
