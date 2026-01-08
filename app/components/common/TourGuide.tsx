"use client";

import { useSiteMode } from "@/app/context/SiteModeContext";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { useEffect } from "react";

export default function TourGuide() {
    const { mode } = useSiteMode();

    useEffect(() => {
        // Check if tour has been seen
        const hasSeenTour = localStorage.getItem("hasSeenTour");

        if (!hasSeenTour) {
            const driverObj = driver({
                showProgress: true,
                animate: true,
                doneBtnText: "Get Started",
                nextBtnText: "Next",
                prevBtnText: "Back",
                onDestroyed: () => {
                    localStorage.setItem("hasSeenTour", "true");
                },
                steps: [
                    {
                        popover: {
                            title: "Welcome to Pondy HealthPort! 🌿",
                            description: "Your gateway to world-class medical care and serene wellness retreats in Pondicherry.",
                            side: "center",
                            align: "center"
                        }
                    },
                    {
                        element: "#tour-mode-switch",
                        popover: {
                            title: "Two Worlds, One Platform",
                            description: "Toggle between **Medical Tourism** for hospital care and **Wellness** for holistic rejuvenation.",
                            side: "bottom",
                            align: "center"
                        }
                    },
                    {
                        element: "#tour-search-toggle",
                        popover: {
                            title: "Find What You Need",
                            description: "Search for specific treatments, hospitals, or wellness centers instantly.",
                            side: "bottom",
                            align: "end"
                        }
                    }
                ]
            });

            // Small delay to ensure elements are mounted
            setTimeout(() => {
                driverObj.drive();
            }, 1000);
        }
    }, []);

    return null;
}
