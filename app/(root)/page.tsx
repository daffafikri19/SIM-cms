import { Metadata } from "next";

import { LoginForm } from "./login-form";
import { BrandLogo } from "../dashboard/components/navbar/brand-logo";

export const metadata: Metadata = {
  title: "Fun Bread Bakery - CMS",
};

export default function HomePage() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="container relative grid h-[100dvh] full flex-col items-center justify-center md:grid">
        <div className="absolute top-2 left-2 font-bold">
          <BrandLogo isCollapsed={false} />
        </div>
        <div className="p-2">
        <div className="mt-10 md:mt-5 lg:mt-0 p-4 border rounded-md shadow-lg">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                LOGIN
              </h1>
              <p className="text-sm text-muted-foreground">
                Masukan email dan password untuk akses CMS
              </p>
            </div>
            <LoginForm />
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
