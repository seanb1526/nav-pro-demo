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
    const [isInArea, setIsInArea] = useState(false);

    const bounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(38.35960, -75.60600), // Southwest corner of the bounds
        new google.maps.LatLng(38.37000, -75.59800)  // Northeast corner of the bounds
    );

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const userPosition = new google.maps.LatLng(latitude, longitude);

                    if (bounds.contains(userPosition)) {
                        setCurrentPosition({ lat: latitude, lng: longitude });
                        setIsInArea(true);
                    } else {
                        setCurrentPosition(null);
                        setIsInArea(false);
                    }
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
                    center={isInArea ? currentPosition : initialPosition}
                    mapId={"e9c9c121873f7673"}
                    options={{
                        zoom: 15,
                        draggable: true,
                        gestureHandling: 'greedy',
                        scrollwheel: true,
                        disableDefaultUI: false,
                    }}
                >
                    {isInArea && currentPosition && (
                        <AdvancedMarker position={currentPosition}>
                            <Pin background={"blue"} borderColor={"white"} glyphColor={"white"}></Pin>
                        </AdvancedMarker>
                    )}
                </Map>
            </div>
        </APIProvider>
    );
}
