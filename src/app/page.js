"use client"; // Added to make this a client component

import dynamic from "next/dynamic";
import Taskbar from "../components/Taskbar";
import "../styles/globals.css";

// Dynamically import the ArcGISMap to prevent SSR issues
const ArcGISMap = dynamic(() => import("../components/ArcGISMap"), { ssr: false });

const newsStories = [
  {
    title: "Story 1775",
    date: "March 17, Croton-On-Hudson, NY 10520",
    description: "It was around...",
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
    title: "This is my song!",
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
        <aside className="news-section w-1/4 bg-gray-200 p-4 flex flex-col h-full">
          <h2 className="news-header text-3xl font-bold text-center mb-4">Events</h2>
          <ul className="news-list space-y-4 flex-grow">
            {newsStories.map((story, index) => (
              <li key={index}>
                <h3 className="news-title font-semibold">{story.title}</h3>
                <p className="news-description text-sm text-gray-600">
                  {story.date}: {story.description}
                </p>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
