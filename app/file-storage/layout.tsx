"use client"
import React from "react";

type props = {
  children: React.ReactNode;
};
const FileManagerLayout = ({ children }: props) => {
  return (
    <div>
      {children}
    </div>
  );
};

export default FileManagerLayout;
