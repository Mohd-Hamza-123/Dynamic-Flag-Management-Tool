import jwt from "jsonwebtoken";
import User from "@/models/user";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("session-token")?.value;

        if (!token) {
            return NextResponse.json(
                { message: "Not authenticated", success: false },
                { status: 401 }
            );
        }

        // Verify JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string; };
        // console.log(decoded)
        const user = await User.findById(decoded.userId).select("-password"); // Exclude password field

        if (!user) {
            return NextResponse.json(
                { message: "User not found", success: false },
                { status: 404 }
            );
        }

        return NextResponse.json({ user, success: true }, { status: 200 });

    } catch (error) {
        return NextResponse.json(
            { message: "Invalid or expired token", success: false },
            { status: 401 }
        );
    }
}