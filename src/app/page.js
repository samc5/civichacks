"use client"; // Added to make this a client component

import dynamic from "next/dynamic";
import Taskbar from "../components/Taskbar";
import "../styles/globals.css";

// Dynamically import the ArcGISMap to prevent SSR issues
const ArcGISMap = dynamic(() => import("../components/ArcGISMap"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <Taskbar />

      <div className="flex flex-grow">
        <div className="map-container flex-1">
          <ArcGISMap />
        </div>
      </div>
    </div>
  );
}
