"use client";

import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useMutation } from "@/lib/hooks";
import { useParams, useRouter } from "next/navigation";
import OptionalChildren from "@/components/ui/OptionalChildren";
import { FullPageSpinner } from "@/components/ui/Spinner";
import { useEffect } from "react";

const CreateFlagPage = () => {

    const { mutate, loading, error } = useMutation();
    const { id } = useParams();
    const router = useRouter();

    useEffect(() => {
        error && alert(error);
    }, [error]);

    const createFlag = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formdata = new FormData(e.currentTarget);

        const name = formdata.get("name") as string;
        const description = formdata.get("description") as string;
        const enabled = formdata.get("enabled") as string;

        if (!name?.trim()) return;

        const resp = await mutate({
            path: `/api/workspaces/${id}/flags`,
            data: { name, description, enabled: !!(enabled === "on"), type: "boolean" }
        });

        if (resp.success) {
            router.push(`/workspace/${id}`);
        }
    }

    return (
        <main className="py-4 max-w-3xl mx-auto px-2">
            <OptionalChildren condition={loading}>
                <FullPageSpinner />
            </OptionalChildren>
            <header className="flex gap-2 items-center">
                <button onClick={() => router.back()}>
                    <ChevronLeft />
                </button>
                <h2 className="text-lg">
                    Create Feature Flag
                </h2>
            </header>
            <form className="space-y-4 mt-6" onSubmit={createFlag}>
                <div className="space-y-2">
                    <Label className="pl-2">Name</Label>
                    <Input
                        name="name"
                        placeholder="Name of the Feature"
                    />
                </div>
                <div className="space-y-2">
                    <Label className="pl-2">Description (Optional)</Label>
                    <Textarea
                        name="description"
                        placeholder="Tell us more about your feature"
                    />
                </div>
                <div className="flex gap-2 items-center justify-between">
                    <Label className="pl-2">Initially Enabled</Label>
                    <Switch name="enabled" defaultChecked={true} />
                </div>

                <Button className="w-fit px-4 mt-8">Create</Button>
            </form>
        </main>
    )

}

export default CreateFlagPage;