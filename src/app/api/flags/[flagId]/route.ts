import { connectDB } from "@/config/db";
import Workspace from "@/models/workspace";
import FeatureFlag from "@/models/FeatureFlag";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function DELETE(req: NextRequest,
    { params }: { params: Promise<{ flagId: string }> }
) {

    try {

        await connectDB()
        const userId = req.headers.get("x-user-id")

        if (!userId) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized"
            }, {
                status: 401
            })
        }

        const { flagId } = await params
        const flag = await FeatureFlag.findById(flagId)

        if (!flag) {
            return NextResponse.json({
                success: false,
                message: `Flag with id ${flagId} not found`
            }, {
                status: 404
            })
        }

        const workspace = await Workspace.findById(flag.workspaceId);

        if (!workspace) {
            return NextResponse.json(
                { success: false, message: "Workspace not found" },
                { status: 404 }
            );
        }

        if (workspace.ownerId.toString() !== userId) {
            return NextResponse.json(
                { success: false, message: "Forbidden" },
                { status: 403 }
            );
        }

        await FeatureFlag.findByIdAndDelete(flagId)
        return NextResponse.json({
            success: true,
            message: `Flag deleted successfully`
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

export async function GET(req: NextRequest,
    { params }: { params: Promise<{ flagId: string }> }
) {

    try {

        await connectDB()
        const { flagId } = await params
        const flag = await FeatureFlag.findById(flagId)

        if (!flag) {
            return NextResponse.json({
                success: false,
                message: `Flag with id ${flagId} not found`
            }, {
                status: 404
            })
        }
        return NextResponse.json({
            success: true,
            flag,
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


export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ flagId: string }> }
) {
    try {
        await connectDB();

        const { flagId } = await params;
        const userId = req.headers.get("x-user-id");

        //  Auth check
        if (!userId) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        // Validate flagId
        if (!mongoose.Types.ObjectId.isValid(flagId)) {
            return NextResponse.json(
                { success: false, message: "Invalid flagId" },
                { status: 400 }
            );
        }

        // Get existing flag
        const flag = await FeatureFlag.findById(flagId);

        if (!flag) {
            return NextResponse.json(
                { success: false, message: "Flag not found" },
                { status: 404 }
            );
        }

        //  Get workspace
        const workspace = await Workspace.findById(flag.workspaceId);

        if (!workspace) {
            return NextResponse.json(
                { success: false, message: "Workspace not found" },
                { status: 404 }
            );
        }

        //  Ownership check
        if (workspace.ownerId.toString() !== userId) {
            return NextResponse.json(
                { success: false, message: "Forbidden" },
                { status: 403 }
            );
        }

        //  Get update payload
        const body = await req.json();
        const { name, description, type, enabled, variations } = body;

        //  Validate type
        const validTypes = ["boolean", "percentage", "variant"];
        if (type && !validTypes.includes(type)) {
            return NextResponse.json(
                { success: false, message: "Invalid type" },
                { status: 400 }
            );
        }

        //  Validate variations if type requires it
        const finalType = type || flag.type;

        if (
            (finalType === "percentage" || finalType === "variant") &&
            variations !== undefined &&
            (!Array.isArray(variations) || variations.length === 0)
        ) {
            return NextResponse.json(
                { success: false, message: "Valid variations required" },
                { status: 400 }
            );
        }

        //  Build update object (only update provided fields)
        const updateData: any = {};

        if (name !== undefined) updateData.name = name;
        if (description !== undefined) updateData.description = description;
        if (type !== undefined) updateData.type = type;
        if (enabled !== undefined) updateData.enabled = enabled;
        if (variations !== undefined) updateData.variations = variations;

        //  Update
        const updatedFlag = await FeatureFlag.findByIdAndUpdate(
            flagId,
            updateData,
            { new: true }
        );

        return NextResponse.json(
            {
                success: true,
                message: "Flag updated successfully",
                flag: updatedFlag,
            },
            { status: 200 }
        );

    } catch (error: unknown) {
        const message =
            error instanceof Error ? error.message : "Internal Server Error";

        return NextResponse.json(
            { success: false, message },
            { status: 500 }
        );
    }
}