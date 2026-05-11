"use client";

import OptionalChildren from "@/components/ui/OptionalChildren";
import { FullPageSpinner } from "@/components/ui/Spinner";
import { useMutation, useQuery } from "@/lib/hooks";
import { ServerResponseType } from "@/types/frontend";
import { CircleUserRoundIcon, SquareArrowRightExit } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const UserPage = () => {

    const { loading, data, error } = useQuery<ServerResponseType<{user: { name: string, email: string }}> | undefined>("/api/auth/me");
    const mutation = useMutation();
    const router = useRouter();

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

    const handleLogout = async () => {
        const resp = await mutation.mutate({ path: "/api/auth/logout" })
        if (resp.success) {
            router.replace("/login");
        }
    }

    return (
        <main>
            <OptionalChildren condition={mutation.loading}>
                <FullPageSpinner />
            </OptionalChildren>
            <header className="space-y-4 border-b border-gray-500/40 py-2">
                <div className="flex items-center gap-4">
                    <div className="size-20 flex flex-cntr-all rounded-full bg-gray-500/40">
                        <CircleUserRoundIcon className="size-12" />
                    </div>
                    <div>
                        <h4 className="text-2xl">{data.user.name}</h4>
                        <p className="text-sm">{data.user.email}</p>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="h-10 px-4 py-2 w-fit gap-2 flex flex-cntr-all rounded-md primary mt-4"
                >
                    <SquareArrowRightExit />
                    <span>Log out</span>
                </button>
            </header>
        </main>
    )

}

export default UserPage;