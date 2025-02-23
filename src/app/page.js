"use client"; // Added to make this a client component

import dynamic from "next/dynamic";
import Taskbar from "../components/Taskbar";
import Sidebar from "../components/NewsBar";
import "../styles/globals.css";

// Dynamically import the ArcGISMap to prevent SSR issues
const ArcGISMap = dynamic(() => import("../components/ArcGISMap"), { ssr: false });

//
// TODO MAP SHIT INTO NEWS ITEMS HERE
//
const newsStories = [
  {
    title: "Story 1775",
    date: "February 23, 2025",
    description: "Donald Trump has reassigned the acting director of ICE due to his discontent with the pace of deportations, and has signed multiple executive orders to accelerate deportations.",
  },
  {
    title: "Story 1774",
    date: "February 21, 2025",
    description: "The Trump administration has deported 37,660 people in his first month, significantly below the monthly average of 57,000 during the last year of Joe Biden's administration",
  },
  {
    title: "Story 1772",
    date: "February 18, 2025",
    description: "The Department of Homeland Security has announced plans to increase deportations, including agreements with several countries, and has reassigned the acting ICE director to oversee all field and enforcement operations.",
  },
  {
    title: "Story 1771",
    date: "February 15, 2025",
    description: "The US has flown nearly 200 undocumented immigrants back to Venezuela from Guantánamo Bay, Cuba, as part of a plan to process and deport immigrants more efficiently",
  }
];

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <Taskbar />

      <div className="flex flex-grow">
        <div className="map-container flex-1">
          <ArcGISMap />
        </div>

        <Sidebar newsStories={newsStories} />
      </div>
    </div>
  );
}