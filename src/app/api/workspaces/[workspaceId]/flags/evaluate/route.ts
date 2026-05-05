import { connectDB } from "@/config/db";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import FeatureFlag from "@/models/FeatureFlag";
import hashUserId from "@/lib/hashUserId";

export async function POST(req: NextRequest,
    { params }: { params: Promise<{ workspaceId: string }> }
) {
    try {
        await connectDB()
        const { workspaceId } = await params
        const userId = req.headers.get("x-user-id")

        if (!userId) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized"
            }, {
                status: 401
            })
        }

        if (!mongoose.Types.ObjectId.isValid(workspaceId)) {
            return NextResponse.json({
                success: false,
                message: "Invalid workspaceId"
            }, { status: 400 });
        }

        const flags = await FeatureFlag.find({ workspaceId });

        // console.log(flags)


        return NextResponse.json({
            success: true,
            message: "evaluation done",
            // result
        }, {
            status: 200
        })

    } catch (error) {
        const message = error instanceof Error ? error.message : "Internal Server Error";
        return NextResponse.json({
            success: false,
            message,
        }, {
            status: 500
        })
    }
}