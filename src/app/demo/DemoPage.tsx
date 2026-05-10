"use client";

import { FullPageSpinner } from "@/components/ui/Spinner";
import { useQuery } from "@/lib/hooks";
import { Flag, ServerResponseType } from "@/types/frontend";

const UserPageHeader = () => (
    <>
        <nav className="py-4 border-b border-gray-500/10">
            Normal Navbar
        </nav>
        <header className="mt-4 px-2 sm:px-4">
            <section className="flex gap-4 items-center">
                <div className="size-20 sm:size-28 rounded-full bg-gray-500/20"></div>
                <div className="space-y-1">
                    <div className="w-40 sm:h-6 bg-gray-500/20 rounded-full"></div>
                </div>
            </section>
            <ul className="my-4 space-y-1">
                {Array(3).fill(0).map((_, i) => (
                    <li
                        style={{
                            width: `calc(80% / ${i + 1})`
                        }}
                        key={i}
                        className="h-2 bg-gray-500/20 rounded-full"></li>
                ))}
            </ul>
            <section className="mt-4 flex gap-2">
                <div className="rounded-md bg-gray-500/20 h-10 w-24 flex-1 sm:flex-none max-w-full"></div>
                <div className="rounded-md bg-gray-500/20 h-10 w-24 flex-1 sm:flex-none max-w-full"></div>
            </section>
        </header>
    </>
)


const DemoPage = ({ user_id }: { user_id: string | null }) => {
    const { loading, error, data } = useQuery<ServerResponseType<{ flags: Flag[] }>>(`/api/workspaces/6a00e7cdcb5c08849054f59c/flags`, !!user_id);

    if (loading) return (
        <FullPageSpinner />
    )

    else if (user_id && (error || !data || !data.success)) return (
        <section className="p-4 space-y-2 bg-gray-500/20 border rounded-md border-gray-500/10">
            <h3 className="text-center">Uh Oh! Something went wrong</h3>
            <p className="ghost text-center">{error || data?.message || "Please refresh the page and try again"}</p>
        </section>
    )

    if (data?.flags?.find(f => f.name === "Navbar" && f.enabled))
        return (
            <main className="pt-4 pb-6 px-2 max-w-3xl mx-auto">
                <nav className="py-4 border-b border-gray-500/10">
                    Admin Navbar
                </nav>
                <UserPageHeader />
            </main>
        )

    else return (
        <main className="pt-4 pb-6 px-2 max-w-3xl mx-auto">
            <UserPageHeader />
        </main>
    )

}

export default DemoPage;