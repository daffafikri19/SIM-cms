import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormLogin } from "./login-form";

export default function Home() {
  return (
    <div className="flex w-full h-full flex-col items-center justify-center p-4">
      <Card className="w-full md:w-[600px] lg:w-[400px]">
        <CardHeader>
          <CardTitle className="text-base text-primary">LOGIN</CardTitle>
        </CardHeader>
        <CardContent className="shadow-xl">
          <FormLogin />
        </CardContent>
      </Card>
    </div>
  );
}
