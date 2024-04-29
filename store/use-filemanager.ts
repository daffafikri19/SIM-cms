import { useEffect } from "react";

interface FileManagerProps {
  onFlmngrLoaded: (() => void | undefined) | undefined;
}

export const UseFileManager = ({ onFlmngrLoaded }: FileManagerProps) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("@flmngr/flmngr-react").then((flmngr) => {
        flmngr.default.load(
          {
            apiKey: `${process.env.NEXT_PUBLIC_FILE_MANAGER_API_KEY}`,
            urlFileManager: `${process.env.NEXT_PUBLIC_API_URL}/flmngr`,
            urlFiles: `${process.env.NEXT_PUBLIC_API_URL}/files`,
          },
          {
            onFlmngrLoaded,
          }
        );
      });
    }
  }, [onFlmngrLoaded]);
};
