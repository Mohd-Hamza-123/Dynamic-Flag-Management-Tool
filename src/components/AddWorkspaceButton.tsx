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
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Textarea } from "./ui/Textarea";
import { Form } from "radix-ui";
import { useMutation } from "@/lib/hooks";

const AddWorkspaceButton = ({ refresh }: any) => {

  const { error, loading, mutate } = useMutation();

  useEffect(() => {
    error && alert(error);
  }, [error]);

  const createWorkspace = async (formData: FormData) => {
    const name = formData.get("name") as string;

    const description = formData.get("description") as string;

    if (!name.trim()) return;

    const resp = await mutate({
      path: "/api/workspaces",
      data: JSON.stringify({ name, description })
    });

    if (resp.success) {
      refresh();
    }

  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex gap-2">
          <Plus className="size-4" />
          Add Workspace
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Workspace</DialogTitle>
        </DialogHeader>

        <form action={createWorkspace} className="space-y-4 mt-4">
          <Input
            placeholder="Name of your Workspace"
            name="name"
          />
          <Textarea
            placeholder="Description (Optional)"
            name="description"
            className="max-h-96"
          />

          <Button disabled={loading} type="submit" className="w-full">
            {loading ? "Please Wait..." : "Create"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddWorkspaceButton;