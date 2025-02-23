import Image from "next/image";
import Taskbar from "../components/Taskbar";
import "../styles/globals.css";

import FormComponent from "./FormComponent";

export default function Home() {
  //list of news stories to be displayed on right side
  const newsStories = [
    {
      title: "Story 1775",
      date: "March 17, Croton-On-Hudson, NY 10520",
      description: "It was around...",
      color: "bg-yellow-200", // Custom color for each event
    },
    {
      title: "Story 1774",
      date: "February 11, Inwood, NY 11096",
      description: "At 6:30am around...",
      color: "bg-green-200",
    },
    {
      title: "Story 1772",
      date: "November 10, Port Washington, NY",
      description: "Around 6am...",
      color: "bg-blue-200",
    },
    {
      title: "This is my song!",
      date: "April 27, Arcadia, CA",
      description: "Around 7pm...",
      color: "bg-purple-200",
    },
    {
      title: "This is my song!",
      date: "April 27, Arcadia, CA",
      description: "Around 7pm...",
      color: "bg-purple-200",
    },
    {
      title: "This is my song!",
      date: "April 27, Arcadia, CA",
      description: "Around 7pm...",
      color: "bg-purple-200",
    },
    {
      title: "This is my song!",
      date: "April 27, Arcadia, CA",
      description: "Around 7pm...",
      color: "bg-purple-200",
    },
    {
      title: "This is my song!",
      date: "April 27, Arcadia, CA",
      description: "Around 7pm...",
      color: "bg-purple-200",
    },
    // Add more stories as needed
  ];

  return (
    <div className="flex flex-col h-screen">
      <Taskbar />

      <div className="flex flex-grow">
        {/* Map Section */}
        <div className="map-container flex-1">
          {/* Add your map image */}
          <img
            src="/path-to-your-map-image.jpg"
            alt="Map"
            className="map-image"
          />
          {/* Example marker (blue dot) */}
          <div className="marker"></div>
        </div>

        {/* News Stories Section */}
        <aside className="news-section w-1/4 bg-gray-200 p-8 flex flex-col h-full">
          {/* Center and enlarge the "Events" header */}
          <h2 className="news-header text-3xl font-bold text-center mb-4">Events</h2>
          <ul className="news-list space-y-4 flex-grow">
            {/* Map through the newsStories array to generate list items */}
            {newsStories.map((story, index) => (
            <li
              key={index}
              className={`p-4 mb-4 rounded-md border ${
                index % 2 === 0 ? "bg-red-400" : "bg-yellow-200"
              }`}
            >
              <h3 className="news-title font-semibold">{story.title}</h3>
              <p className="news-description text-sm text-gray-600">
                {story.date}: {story.description}
              </p>
            </li>
          ))}

          </ul>
        </aside>
      </div>
</div>)}
