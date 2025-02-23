import React from "react";
import styles from "./NewsBar.module.css";

const NewsBar = ({ newsStories }) => {
  return (
    <aside className={`${styles.newsSection} w-1/4 p-4 flex flex-col`}>
      <h2 className={`${styles.newsHeader} text-3xl font-bold`}>Events</h2>
      <ul className={`${styles.newsList} space-y-4 flex-grow`}>
        {newsStories.map((story, index) => (
          <li key={index} className={`${styles.newsItem} p-4 rounded-lg shadow-md`}>
            <h3 className="font-semibold">{story.title}</h3>
            <p className="text-sm text-gray-600">
              {story.date}: {story.description}
            </p>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default NewsBar;