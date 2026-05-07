"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { validateForm } from "../utils";
import { useMutation } from "@/lib/hooks";
import OptionalChildren from "@/components/ui/OptionalChildren";
import { FullPageSpinner } from "@/components/ui/Spinner";

export default function RegisterPage() {

  const router = useRouter();

  const { error, loading, mutate } = useMutation();

  // Alert when there is an error
  useEffect(() => {
    error && alert(error)
  }, [error]);

  const handleRegister = async (formData: FormData) => {

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const form = { name, email, password }

    const validated = validateForm(form, true);

    if (!validated.success) {
      alert(validated.message);
    } else {
      const response = await mutate<{ success: boolean, message: string }>({
        path: "/api/auth/register",
        data: form
      });

      if (!response.success || !response.result || response.result.success) {
        if (response.result?.message) {
          alert(response.result.message);
          return;
        }
      } else {
        alert("Registered successfully");
        router.push("/login");
      }
    }

  };

  return (
    <>
      <OptionalChildren condition={loading}>
        <FullPageSpinner />
      </OptionalChildren>
      <div className="flex flex-col flex-cntr-all m-auto h-full">
        <Card className="bg-transparent w-96 border-0 ring-0">
          <CardHeader>
            <CardTitle className="text-center text-lg">Register</CardTitle>
          </CardHeader>

          <CardContent>
            <form className="space-y-4 w-full" action={handleRegister}>
              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  placeholder="Enter your name"
                  name="name"
                />
              </div>

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

              <Button type="submit" className="w-full">
                Register
              </Button>
            </form>

            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-blue-600 cursor-pointer"
              >
                Login
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}