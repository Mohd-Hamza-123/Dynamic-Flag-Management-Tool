import verifyToken from "./lib/verifyToken";
import { NextRequest, NextResponse } from "next/server";

async function proxy(request: NextRequest) {

    try {
        const token = request.cookies.get("session-token")?.value;
        // console.log(token)
        if (!token) {
            return NextResponse.json({
                error: 'Unauthorized',
                success: false
            }, { status: 401 })
        }

        const userId = await verifyToken(token)
        // console.log("proxy : " + userId)
        const headers = new Headers(request.headers)
        headers.set("x-user-id", userId)
        return NextResponse.next({ request: { headers } })

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Internal Server Error";
        return NextResponse.json({
            success: false,
            error: message,
        }, { status: 401 })
    }

}

export const config = {
    matcher: [
        "/api/workspaces/:path*",
        "/api/flags/:path*",
        "/api/auth/me",
    ],
}



export default proxy