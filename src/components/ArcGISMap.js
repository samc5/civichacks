"use client"; // Ensures it's a client-side component

import { useEffect, useRef, useState } from "react";
import { loadModules } from "esri-loader";

const ArcGISMap = () => {
    const mapRef = useRef(null);
    const [points, setPoints] = useState([]); // State to hold the points

    useEffect(() => {
        let view;

        loadModules([
            "esri/Map",
            "esri/views/MapView",
            "esri/Graphic",
            "esri/layers/GraphicsLayer"
        ], { css: true }).then(([Map, MapView, Graphic, GraphicsLayer]) => {

            const map = new Map({
                basemap: "streets-navigation-vector",
            });

            view = new MapView({
                container: mapRef.current,
                map: map,
                center: [-98.5795, 39.8283], // Center of the USA
                zoom: 4,
            });

            const graphicsLayer = new GraphicsLayer();
            map.add(graphicsLayer);

            // Fetch points from MongoDB API
            fetch("/api/points")
                .then((res) => {
                  if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                  }
                  return res.json();
                })
                .then((data) => {
                    console.log("Fetched Data:", data); //Log the data to see what it is
                    setPoints(data); //Sets points to be the data fetched
                })
                .catch((error) => console.error("Error fetching points:", error));

            if(points.length > 0) {
              console.log("points length is greater than 0");
              loadModules(["esri/Graphic"], { css: true }).then(([Graphic]) => {

                points.forEach(point => {
                    const graphic = new Graphic({
                        geometry: {
                            type: "point",
                            longitude: point.longitude,
                            latitude: point.latitude,
                        },
                        symbol: {
                            type: "simple-marker",
                            color: "blue",
                            size: "10px",
                        },
                        attributes: {
                            Name: point.name,
                        },
                        popupTemplate: {
                            title: "{Name}",
                        },
                    });
                    graphicsLayer.add(graphic);
                });
            });
          }

            return () => view?.destroy();
        });
    }, []);

    return <div ref={mapRef} style={{ width: "100%", height: "500px" }} />;
};

export default ArcGISMap;