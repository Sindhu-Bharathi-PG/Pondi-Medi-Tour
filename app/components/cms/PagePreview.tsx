"use client";

import MedicalHome from "@/app/components/home/MedicalHome";
import WellnessHome from "@/app/components/home/WellnessHome";
import { HomePageConfig } from "@/app/types/homeConfig.types";

interface PagePreviewProps {
    pageType: "medical" | "wellness";
    config: HomePageConfig;
}

export default function PagePreview({ pageType, config }: PagePreviewProps) {
    return (
        <div className="w-full h-full bg-white overflow-y-auto custom-scrollbar">
            <div className="origin-top transform scale-[0.8] h-[125%] w-[125%] pointer-events-none select-none border-b border-slate-200">
                {pageType === "medical" && <MedicalHome externalConfig={config} />}
                {pageType === "wellness" && <WellnessHome externalConfig={config} />}
            </div>
        </div>
    );
}
