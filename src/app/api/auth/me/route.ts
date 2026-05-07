import User from "@/models/user";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import verifyToken from "@/lib/verifyToken";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("session-token")?.value;

        if (!token) {
            return NextResponse.json(
                { message: "Token not found", success: false },
                { status: 401 }
            );
        }

        // Verify JWT
        const userId = await verifyToken(token);
        const user = await User.findById(userId).select("-password"); // Exclude password field

        if (!user) {
            return NextResponse.json(
                { message: "User not found", success: false },
                { status: 404 }
            );
        }

        return NextResponse.json({ user, success: true }, { status: 200 });

    } catch (error) {
        const message = error instanceof Error ? error.message : "Internal Server Error";
        return NextResponse.json(
            { message, success: false },
            { status: 401 }
        );
    }
}