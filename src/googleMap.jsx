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
    const [showCurrentMarker, setShowCurrentMarker] = useState(false);

    useEffect(() => {
        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setCurrentPosition({ lat: latitude, lng: longitude });
                        console.log("Current Position:", { lat: latitude, lng: longitude });
                        // Check if current position is within bounds
                        const isInBounds = checkBounds({ lat: latitude, lng: longitude });
                        setShowCurrentMarker(isInBounds);
                    },
                    (error) => {
                        console.error("Error getting geolocation:", error);
                        setShowCurrentMarker(false); // Default to not showing marker on error
                    },
                    { enableHighAccuracy: true } // Enable high accuracy mode
                );
            } else {
                console.error("Geolocation is not supported by this browser.");
                setShowCurrentMarker(false); // Default to not showing marker if geolocation not supported
            }
        };

        getLocation();
    }, []);

    const initialPosition = { lat: 38.36514, lng: -75.60210 };
    const bounds = {
        north: 38.36532,
        south: 38.36466,
        east: -75.60169,
        west: -75.60243,
    };

    const checkBounds = ({ lat, lng }) => {
        return lat >= bounds.south && lat <= bounds.north &&
               lng >= bounds.west && lng <= bounds.east;
    };

    return (
        <APIProvider apiKey={"AIzaSyCUF5Jgaynpno29mmmDPUzsTlz82CwxJ6Q"}>
            <div style={{ height: "600px", width: "600px" }}>
                <Map
                    defaultZoom={19}
                    center={currentPosition && checkBounds(currentPosition) ? currentPosition : initialPosition}
                    mapId={"e9c9c121873f7673"}
                    options={{
                        zoom: 15,
                        draggable: true,
                        gestureHandling: 'greedy',
                        scrollwheel: true,
                        disableDefaultUI: false,
                    }}
                >
                    {showCurrentMarker && (
                        <AdvancedMarker position={currentPosition}>
                            <Pin background={"blue"} borderColor={"white"} glyphColor={"white"}></Pin>
                        </AdvancedMarker>
                    )}

                    {/* Marker for initial position when not within bounds */}
                    {!showCurrentMarker && (
                        <AdvancedMarker position={initialPosition}>
                            <Pin background={"red"} borderColor={"white"} glyphColor={"white"}></Pin>
                        </AdvancedMarker>
                    )}
                </Map>
            </div>
        </APIProvider>
    );
}

