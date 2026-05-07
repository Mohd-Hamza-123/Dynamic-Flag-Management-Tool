import bcrypt from "bcryptjs";
import User from "@/models/user";
import { connectDB } from "@/config/db";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {

        const { name, email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                { success: false, message: "Email and password required" },
                { status: 400 }
            );
        }

        await connectDB();

        const existing = await User.findOne({ email });
        if (existing) {
            return NextResponse.json(
                { success: false, message: "User already exists" },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            password: hashedPassword
        });

        return NextResponse.json(
            { success: true, message: "User registered successfully" },
            { status: 201 }
        );

    } catch (err: unknown) {
        return NextResponse.json({
            success: false,
            message:
                err instanceof Error ? err.message : "Internal Server Error"
        }, { status: 500 });
    }
}