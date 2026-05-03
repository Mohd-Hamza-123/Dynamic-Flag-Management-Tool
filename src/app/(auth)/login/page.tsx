"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    // later connect API
    console.log(form);

    alert("Login successful (demo)");
    router.push("/dashboard");
  };

  return (
    <div className="flex justify-center items-center h-[90vh]">
      <Card className="w-[400px] shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">Login</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Enter your email"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          <div>
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Enter password"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />
          </div>

          <Button className="w-full" onClick={handleLogin}>
            Login
          </Button>

          <p className="text-sm text-center">
            Don't have an account?{" "}
            <span
              onClick={() => router.push("/register")}
              className="text-blue-600 cursor-pointer"
            >
              Register
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}