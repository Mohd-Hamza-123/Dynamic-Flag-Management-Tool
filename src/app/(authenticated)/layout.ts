import { isValidUser } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

const AuthenticatedLayout = async ({ children }: PropsWithChildren) => {

    const user = await isValidUser(await cookies())
    if (!user) redirect("/login");

    return children;

}

export default AuthenticatedLayout;