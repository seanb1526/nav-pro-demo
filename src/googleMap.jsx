"use client";

import { useState, useEffect } from "react";
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
} from "@vis.gl/react-google-maps";

export default function DemoMap() {
    const [currentPosition, setCurrentPosition] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCurrentPosition({ lat: latitude, lng: longitude });
                },
                (error) => {
                    console.error("Error getting geolocation:", error);
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }, []);

    const initialPosition = { lat: 38.36514, lng: -75.60210 };

    return (
        <APIProvider apiKey={"AIzaSyCUF5Jgaynpno29mmmDPUzsTlz82CwxJ6Q"}>
            <div style={{ height: "600px", width: "600px" }}>
                <Map
                    defaultZoom={19}
                    center={currentPosition || initialPosition}
                    mapId={"e9c9c121873f7673"}
                    options={{
                        zoom: 15,
                        draggable: true,
                        gestureHandling: 'greedy',
                        scrollwheel: true,
                        disableDefaultUI: false,
                    }}
                >
                    
                    {currentPosition && (
                        <AdvancedMarker position={currentPosition}>
                            <Pin background={"blue"} borderColor={"white"} glyphColor={"white"}></Pin>
                        </AdvancedMarker>
                   )}
                </Map>
            </div>
        </APIProvider>
    );
}
