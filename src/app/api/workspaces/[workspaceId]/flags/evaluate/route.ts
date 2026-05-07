import mongoose from "mongoose";
import { connectDB } from "@/config/db";
import hashUserId from "@/lib/hashUserId";
import FeatureFlag from "@/models/FeatureFlag";
import { NextRequest, NextResponse } from "next/server";

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


        const result = {} as any

        flags.forEach((flag) => {

            // For each feature flag → decide what value this user should get → store it in result.

            if (flag.type === "boolean") {
                result[flag.key] = flag.enabled
            }

            // Percentage rollout flags
            else if (flag.type === "percentage") {

                const hash = hashUserId(userId + flag.key) // to ensure different distribution for different flags
                const slot = hash % 100;
                // console.log("bucket", bucket)
                let selected = flag.variations[0]?.value
                let cumulative = 0

                for (const variation of flag.variations) {
                    cumulative += variation?.weight || 0
                    // console.log(cumulative)
                    if (slot < cumulative) {
                        selected = variation.value
                        break
                    }
                }

                if (selected === true) {
                    result[flag.key] = true
                }

            }
        })



        return NextResponse.json({
            success: true,
            message: "evaluation done",
            result
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