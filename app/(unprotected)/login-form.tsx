"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const FormLogin = () => {
  
  const [isShowPassword, setIsShowPassword] = useState(false);

  const router = useRouter();

  return (
    <form action="" className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input type="email" placeholder="yourname@gmail.com" />
      </div>
      <div className="relative">
        <Label htmlFor="password">Password</Label>
        <div className="flex items-center">
          <Input type={isShowPassword ? "text" : "password"} />
          <div className="absolute right-0 p-1 border rounded-r-md cursor-pointer hover:bg-primary-foreground"
            onClick={() => setIsShowPassword(!isShowPassword)}
          >
            <EyeIcon />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between space-x-2">
        <div className="flex items-center space-x-2">
          <Checkbox id="remember-me" />
          <Label htmlFor="remember-me">Ingat Sandi ?</Label>
        </div>
        <div>
          <small className="border-b border-primary cursor-pointer">
            Lupa Sandi
          </small>
        </div>
      </div>
      <div>
        <Button type="button" className="w-full"
            onClick={() => router.push("/dashboard")}
        >LOGIN</Button>
      </div>
    </form>
  );
};
