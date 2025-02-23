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
    date: "March 17, Croton-On-Hudson, NY 10520",
    description: "It was around the...",
  },
  {
    title: "Story 1774",
    date: "February 11, Inwood, NY 11096",
    description: "At 6:30am around...",
  },
  {
    title: "Story 1772",
    date: "November 10, Port Washington, NY",
    description: "Around 6am...",
  },
  {
    title: "Story 1771",
    date: "April 27, Arcadia, CA",
    description: "Around 7pm...",
  },
  {
    title: "Story 1771",
    date: "April 27, Arcadia, CA",
    description: "Around 7pm...",
  },
  {
    title: "Story 1771",
    date: "April 27, Arcadia, CA",
    description: "Around 7pm...",
  },
  {
    title: "Story 1771",
    date: "April 27, Arcadia, CA",
    description: "Around 7pm...",
  },
  {
    title: "Story 1771",
    date: "April 27, Arcadia, CA",
    description: "Around 7pm...",
  },
  {
    title: "Story 1771",
    date: "April 27, Arcadia, CA",
    description: "Around 7pm...",
  },
  {
    title: "Story 1771",
    date: "April 27, Arcadia, CA",
    description: "Around 7pm...",
  },
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