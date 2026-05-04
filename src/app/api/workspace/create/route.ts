import mongoose from "mongoose";
import { connectDB } from "@/config/db";
import Workspace from "@/models/workspace";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const generateApiKey = (env : string) => {
  const random = crypto.randomBytes(8).toString("hex"); // 16 chars
  return `${env}_${random}`;
};

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();
        const { name, description } = body;

        // basic validation
        if (!name) {
            return NextResponse.json(
                { error: "Workspace name is required" },
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
            environments
        });

        return NextResponse.json(
            {
                message: "Workspace created successfully",
                workspace
            },
            { status: 201 }
        );
    } catch (error: unknown) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Internal Server Error" },
            { status: 500 }
        );
    }
}