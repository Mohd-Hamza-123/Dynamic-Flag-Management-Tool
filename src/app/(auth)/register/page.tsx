"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleRegister = async () => {
    // later connect API
    console.log(form);

    alert("Registered successfully (demo)");
    router.push("/login");
  };

  return (
    <div className="flex justify-center items-center h-[90vh]">
      <Card className="w-[400px] shadow-lg">
        <CardHeader>
          <CardTitle className="text-center">Register</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input
              placeholder="Enter your name"
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
          </div>

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

          <Button className="w-full" onClick={handleRegister}>
            Register
          </Button>

          <p className="text-sm text-center">
            Already have an account?{" "}
            <span
              onClick={() => router.push("/login")}
              className="text-blue-600 cursor-pointer"
            >
              Login
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}