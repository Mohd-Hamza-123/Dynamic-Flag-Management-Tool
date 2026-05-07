"use client";


import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import OptionalChildren from "@/components/ui/OptionalChildren";
import { FullPageSpinner } from "@/components/ui/Spinner";
import { useMutation } from "@/lib/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { validateForm } from "../utils";

export default function LoginPage() {
  const router = useRouter();

  const { error, loading, mutate } = useMutation();

  // Alert when there is an error
  useEffect(() => {
    error && alert(error)
  }, [error]);

  const handleLogin = async (formData: FormData) => {

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const form = { email, password }

    const validated = validateForm(form, false);

    if (!validated.success) {
      alert(validated.message);
    } else {
      const response = await mutate<{ success: boolean, message: string }>({
        path: "/api/auth/login",
        data: form
      });

      if (!response.success || !response.result || response.result.success) {
        if (response.result?.message) {
          alert(response.result.message);
          return;
        }
      } else {
        alert("Login successfully");
        router.push("/dashboard");
      }
    }

  };

  return (
    <>
      <OptionalChildren condition={loading}>
        <FullPageSpinner />
      </OptionalChildren>
      <div className="flex justify-center items-center h-[90vh]">
        <Card className="bg-transparent w-96 border-0 ring-0">
          <CardHeader>
            <CardTitle className="text-center text-lg">Login</CardTitle>
          </CardHeader>

          <CardContent>
            <form className="space-y-4" action={handleLogin}>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                />
              </div>

              <div className="space-y-2">
                <Label>Password</Label>
                <Input
                  type="password"
                  placeholder="Enter password"
                  name="password"
                />
              </div>

              <Button className="w-full">
                Login
              </Button>
            </form>

            <p className="text-sm text-center mt-4">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-blue-600 cursor-pointer"
              >
                Register
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}