import crypto from "crypto";
import { connectDB } from "@/config/db";
import mongoose from "mongoose";
import Workspace from "@/models/workspace";
import { NextRequest, NextResponse } from "next/server";

const generateApiKey = (env: string) => {
    const random = crypto.randomBytes(8).toString("hex"); // 16 chars
    return `${env}_${random}`;
};

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();
        const { name, description } = body;
        const userId = req.headers.get("x-user-id")
        
        // basic validation
        if (!name) {
            return NextResponse.json(
                { success: false, message: "Workspace name is required" },
                { status: 400 }
            );
        }

        // generate simple API keys for environments
        const environments = ["dev", "staging", "prod"].map((env) => ({
            name: env,
            apiKey: generateApiKey(env)
        }));

        const workspace = await Workspace.create({
            name,
            description,
            environments,
            ownerId: userId
        });

        return NextResponse.json(
            {
                success: true,
                message: "Workspace created successfully",
                workspace
            },
            { status: 201 }
        );

    } catch (error: unknown) {
        return NextResponse.json(
            {
                success: false,
                message: error instanceof Error ? error.message : "Internal Server Error"
            },
            { status: 500 }
        );
    }
}

export async function GET(req: NextRequest) {
    try {

        const userId = req.headers.get("x-user-id");

        if (!userId) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized"
            }, {
                status: 401
            })
        }

        const workspaces = await Workspace.find({
            ownerId: new mongoose.Types.ObjectId(userId)
        });

        if (workspaces.length === 0) {
            return NextResponse.json({
                success: true,
                message: "No workspaces found",
                workspaces: []
            });
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