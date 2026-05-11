"use client";

import FlagList from "@/components/FlagList";
import OptionalChildren from "@/components/ui/OptionalChildren";
import { FullPageSpinner } from "@/components/ui/Spinner";
import { useMutation, useQuery } from "@/lib/hooks";
import { ServerResponseType, Workspace } from "@/types/frontend";
import { FolderIcon, PlusIcon, ChevronLeft, EllipsisVertical, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { DropdownMenu } from "radix-ui";
import { useEffect } from "react";

const WorkspacePage = () => {
    const { id } = useParams();
    const router = useRouter();

    const { loading, error, data } = useQuery<ServerResponseType<{ workspace: Workspace }>>(`/api/workspaces/${id}`);
    const mutation = useMutation();

    useEffect(() => {
        mutation.error && alert(error);
    }, [mutation.error]);


    if (loading) return (
        <FullPageSpinner />
    )

    else if (error || !data || !data.success) return (
        <section className="p-4 space-y-2 bg-gray-500/20 border rounded-md border-gray-500/10">
            <h3 className="text-center">Uh Oh! Something went wrong</h3>
            <p className="ghost text-center">{error || data?.message || "Please refresh the page and try again"}</p>
        </section>
    )

    const handleDeleteWorkspace = async () => {
        const resp = await mutation.mutate({
            path: `/api/workspaces/${id}`,
            mode: "DELETE"
        });

        if (resp.success) {
            router.replace("/dashboard");
        }
    }

    return (
        <main className="max-w-3xl pb-4 pt-2 mx-auto space-y-6 px-2">
            <OptionalChildren condition={mutation.loading}>
                <FullPageSpinner />
            </OptionalChildren>
            <header className="space-y-4 border-b border-gray-500/40 py-2">
                <div className="flex items-center justify-between flex-2">
                    <div className="flex gap-2 items-center">
                        <button onClick={() => router.back()}>
                            <ChevronLeft />
                        </button>
                        <h2 className="text-2xl">
                            Workspace
                        </h2>
                    </div>
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger asChild>
                            <button className="IconButton" aria-label="Options">
                                <EllipsisVertical />
                            </button>
                        </DropdownMenu.Trigger>

                        <DropdownMenu.Portal>
                            <DropdownMenu.Content className="DropdownMenuContent p-2 border rounded-md border-gray-500/10 bg-gray-500/10" sideOffset={5}>
                                <DropdownMenu.Item onClick={handleDeleteWorkspace} className="DropdownMenuItem flex gap-2 items-center cursor-pointer">
                                    <TrashIcon />
                                    <span>Delete Workspace</span>
                                </DropdownMenu.Item>
                            </DropdownMenu.Content>
                        </DropdownMenu.Portal>
                    </DropdownMenu.Root>

                </div>
                <section>
                    <div className="flex items-center gap-4">
                        <div className="size-20 flex flex-cntr-all rounded-full bg-gray-500/40">
                            <FolderIcon className="size-12" />
                        </div>
                        <div>
                            <h4 className="text-2xl">{data.workspace.name}</h4>
                           
                        </div>
                    </div>
                    <div className="my-4 space-y-4">
                        <p>{data.workspace.description || "No description provided"}</p>
                        <Link className="h-10 px-4 py-2 w-fit gap-2 flex flex-cntr-all rounded-md primary" href={`${id}/create`}>
                            <PlusIcon />
                            <span>Add Feature</span>
                        </Link>
                    </div>
                </section>
            </header>
            <section className="space-y-4">
                <h3 className="text-xl font-semibold">Feature Flags</h3>
                <FlagList wsp_id={id as string} />
            </section>
        </main>
    )

}

export default WorkspacePage;