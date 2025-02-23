"use client"; // Ensures it's a client-side component

import { useEffect, useRef, useState } from "react";
import { loadModules } from "esri-loader";

const ArcGISMap = () => {
    const mapRef = useRef(null);
    const [points, setPoints] = useState([]); // State to hold the points
    const [loading, setLoading] = useState(true); // Loading state to track fetch status

    useEffect(() => {
        // Fetch points from MongoDB API
        fetch("/api/points")
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                console.log("Fetched Data:", data); // Log the data to see what it is
                setPoints(data); // Set points to be the data fetched
                console.log("apples:", data.length);
                setLoading(false); // Set loading to false when data is fetched
            })
            .catch((error) => {
                console.error("Error fetching points:", error);
                setLoading(false); // Set loading to false in case of error
            });
    }, []); // Empty dependency array ensures this effect runs only once when component mounts

    useEffect(() => {
        if (loading || points.length === 0) {
            return; // Don't initialize map if data is still loading or no points are fetched
        }

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

            // Add points to map as graphics
            points.forEach((point) => {
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
                        Location: point.location,
                        Address: point.address,
                        Date: point.date,
                        Description: point.how_ice_found
                    },
                    popupTemplate: {
                        title: "{Location}", 
                        content: [
                            {
                                type: "text",  // Text content type
                                text: "Date: {Date} <br/> Address: {Address} <br/> Description: {Description}",  // Reference more attributes
                            },
                        ]
                    },
                });
                graphicsLayer.add(graphic);
            });

        });

        return () => view?.destroy(); // Clean up map view on component unmount
    }, [loading, points]); // Re-run map initialization when loading or points change

    if (loading) {
        return <div>Loading map...</div>; // Show loading message while points are being fetched
    }

    return <div ref={mapRef} style={{ width: "100%", height: "500px" }} />;
};

export default ArcGISMap;
