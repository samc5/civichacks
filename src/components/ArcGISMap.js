"use client"; // Ensures it's a client-side component

import { useEffect, useRef } from "react";
import { loadModules } from "esri-loader";

const ArcGISMap = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    let view;

    loadModules([
      "esri/Map",
      "esri/views/MapView",
      "esri/Graphic",
      "esri/layers/GraphicsLayer"
    ]).then(([Map, MapView, Graphic, GraphicsLayer]) => {
      
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
        .then((res) => res.json())
        .then((data) => {
          data.forEach((point) => {
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
    });

    return () => view?.destroy();
  }, []);

  return <div ref={mapRef} style={{ width: "100%", height: "500px" }} />;
};

export default ArcGISMap;