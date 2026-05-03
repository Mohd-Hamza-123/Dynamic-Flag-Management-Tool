"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { useState } from "react";
import { Plus } from "lucide-react";

export default function AddFlagDialog({ refresh }: any) {
  const [name, setName] = useState("");
  const [environment, setEnvironment] = useState("development");

  const createFlag = async () => {
    if (!name.trim()) return;

    await fetch("/api/flags", {
      method: "POST",
      body: JSON.stringify({ name, environment }),
    });

    setName("");
    refresh();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex gap-2">
          <Plus className="w-4 h-4" />
          Add Feature
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Feature Flag</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <Input
            placeholder="Feature name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Select onValueChange={setEnvironment} defaultValue="development">
            <SelectTrigger>
              <SelectValue placeholder="Select Environment" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="development">Development</SelectItem>
              <SelectItem value="staging">Staging</SelectItem>
              <SelectItem value="production">Production</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={createFlag} className="w-full">
            Create Flag
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}