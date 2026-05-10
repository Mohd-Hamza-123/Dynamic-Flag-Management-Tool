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
import { useMutation } from "@/lib/hooks";
import { Plus } from "lucide-react";
import { useEffect } from "react";
import { Textarea } from "./ui/Textarea";

const AddWorkspaceButton = ({ refresh }: any) => {

  const { error, loading, mutate } = useMutation();

  useEffect(() => {
    error && alert(error);
  }, [error]);

  const createWorkspace = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;

    const description = formData.get("description") as string;

    if (!name.trim()) return;

    const resp = await mutate({
      path: "/api/workspaces",
      data: { name, description }
    });

    if (resp.success) {
      refresh();
    } else {
      alert((resp.result as Record<string, any> | null)?.message || "Something went wrong! Please try again.")
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

        <form onSubmit={createWorkspace} className="space-y-4 mt-4">
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