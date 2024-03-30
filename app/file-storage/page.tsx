"use client"
import React, { useEffect } from "react";

interface TabFileProps {
    onFileSelected?: (image: string) => void;
}

const FileManagerPage: React.FC<TabFileProps> = ({ onFileSelected }) => {

    useEffect(() => {
        if (typeof window !== "undefined") {
            import("@flmngr/flmngr-react").then((fileManager) => {
                fileManager.default.load({
                    apiKey: `${process.env.NEXT_PUBLIC_FILE_MANAGER_API_KEY}`,
                    urlFileManager: `${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL}/flmngr`,
                    urlFiles: `${process.env.NEXT_PUBLIC_BACKEND_SERVER_URL}/files`,
                });

                openFileManager(fileManager.default);
            });
        }
    }, []);

    const openFileManager = (fileManager: any) => {
        fileManager.open({
            isMultiple: false,
            isMaximized: true,
            showCloseButton: false,
            onFileSelected: () => {},
            showMaximizeButton: false,
            acceptExtensions: ["png", "jpg", "jpeg", "gif", "webp", "mp4", "svg"],
            onFinish: (files: any) => {
                // const image = files[0]?.url || "";
                // if (image) {
                //     const imageUrl = new URL(image).pathname;
                //     console.log("file image url", imageUrl);
                //     if(onFileSelected) {
                //         onFileSelected(imageUrl);
                //     }
                // }
            }
        });
    };

    return null;
};

export default FileManagerPage;