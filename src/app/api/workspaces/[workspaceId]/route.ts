import { connectDB } from "@/config/db";
import Workspace from "@/models/workspace";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose"

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ workspaceId: string }> }
) {
    try {

        await connectDB();
        const { workspaceId } = await params
        // console.log(workspaceId)
        const userId = req.headers.get("x-user-id");

        if (!userId) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        // Only allow owner to delete
        const workspace = await Workspace.findOneAndDelete({
            _id: workspaceId,
            ownerId: userId
        });

        if (!workspace) {
            return NextResponse.json(
                { success: false, message: "Workspace not found or not authorized" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, message: "Workspace deleted successfully" },
            { status: 200 }
        );

    } catch (error: unknown) {
        return NextResponse.json(
            {
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : "Internal Server Error",
            },
            { status: 500 }
        );
    }
}



export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ workspaceId: string }> }
) {
    try {
        await connectDB();

        const userId = req.headers.get("x-user-id");

        if (!userId) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized"
            }, {
                status: 401
            })
        }

        const { workspaceId } = await params

        const workspaces = await Workspace.findOne({
            _id: new mongoose.Types.ObjectId(workspaceId),
            ownerId: new mongoose.Types.ObjectId(userId)
        });

        if (!workspaces) {
            return NextResponse.json({
                success: false,
                message: "Workspace not found"
            }, {
                status: 404
            })
        }

        return NextResponse.json({
            success: true,
            workspaces
        })
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Internal Server Error";
        return NextResponse.json({
            success: false,
            error: message,
        }, {
            status: 500
        })
    }
}