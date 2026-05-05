import mongoose from "mongoose"
import { connectDB } from "@/config/db";
import Workspace from "@/models/workspace";
import FeatureFlag from "@/models/FeatureFlag";
import { NextResponse, NextRequest } from "next/server";
import { generateFeatureKey } from "@/lib/generateFeatureKey";
import { validateVariations } from "@/lib/validateVariations";

export async function POST(req: NextRequest,
    { params }: { params: Promise<{ workspaceId: string }> }
) {

    try {

        await connectDB()
        const { workspaceId } = await params
        const { name, description, type, enabled, variations } = await req.json()
        const userId = req.headers.get("x-user-id")

        if (!userId) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized"
            }, {
                status: 401
            })
        }

        const validTypes = ["boolean", "percentage", "variant"];

        if (!validTypes.includes(type)) {
            return NextResponse.json({
                success: false,
                message: "Invalid type"
            }, { status: 400 });
        }

        if (!name) {
            return NextResponse.json({
                success: false,
                message: "Name is required"
            }, {
                status: 400
            })
        }

        if (!mongoose.Types.ObjectId.isValid(workspaceId)) {
            return NextResponse.json({
                success: false,
                message: "Invalid workspaceId"
            }, { status: 400 });
        }

        const workspaceExist = await Workspace.findById(workspaceId)

        if (!workspaceExist) {
            return NextResponse.json({
                success: false,
                message: "Workspace not found"
            }, {
                status: 404
            })
        }

        if (workspaceExist.ownerId.toString() !== userId) {
            return NextResponse.json({
                success: false,
                message: "Forbidden"
            }, {
                status: 403
            })
        }


        const valid = validateVariations(type, variations)

        const key = generateFeatureKey(name)
        const newFlag = await FeatureFlag.create({
            key,
            type,
            name,
            workspaceId,
            enabled: enabled || false,
            variations: variations || [],
            description: description || "",
        })

        return NextResponse.json({
            success: true,
            message: `flag Created`,
            flag: newFlag
        }, {
            status: 200
        })

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Internal Server Error";
        return NextResponse.json({
            success: false,
            message,
        }, {
            status: 500
        })
    }
}

export async function GET(req: NextRequest,
    { params }: { params: Promise<{ workspaceId: string }> }
) {
    try {
        await connectDB()
        const { workspaceId } = await params

        if (!mongoose.Types.ObjectId.isValid(workspaceId)) {
            return NextResponse.json({
                success: false,
                message: "Invalid workspaceId"
            }, { status: 400 });
        }

        const flags = await FeatureFlag.find({ workspaceId })

        return NextResponse.json({
            success: true,
            flags
        }, {
            status: 200
        })

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Internal Server Error";
        return NextResponse.json({
            success: false,
            message,
        }, {
            status: 500
        })
    }
}

