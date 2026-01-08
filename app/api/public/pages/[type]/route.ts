import medicalConfigDefault from "@/app/config/home/medicalConfig.json";
import wellnessConfigDefault from "@/app/config/home/wellnessConfig.json";
import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ type: string }> }
) {
    const { type } = await params;

    // Validate page type
    if (!["medical", "wellness"].includes(type)) {
        return NextResponse.json(
            { error: "Invalid page type" },
            { status: 400 }
        );
    }

    try {
        // Try to fetch from backend
        const response = await fetch(
            `${BACKEND_URL}/api/cms/public/pages/${type}`,
            {
                cache: "no-store",
                headers: { "Content-Type": "application/json" },
            }
        );

        if (response.ok) {
            const data = await response.json();
            if (data.config) {
                return NextResponse.json({
                    config: data.config,
                    source: "database",
                });
            }
        }
    } catch (error) {
        console.log("Backend unavailable, using fallback config");
    }

    // Fallback to local JSON config
    const fallbackConfig =
        type === "medical" ? medicalConfigDefault : wellnessConfigDefault;

    return NextResponse.json({
        config: fallbackConfig,
        source: "fallback",
    });
}
