import { isValidUser } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

const AuthLayout = async ({ children }: PropsWithChildren) => {
    const user = await isValidUser(await cookies())

    if (user) redirect("/dashboard");

    return (
        <main className="md:flex h-dvh p-2">
            <section className="relative hidden md:flex flex-1 flex-cntr-all border border-gray-500/40 rounded-md">
                <div>
                    <div className="patternBackground"></div>
                    <h1 className="relative z-1 text-xl sm:text-3xl font-semibold">Flag Management System</h1>
                </div>
            </section>
            <section className="h-full">
                {children}
            </section>
        </main>
    )

}

export default AuthLayout;