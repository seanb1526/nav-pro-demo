"use client";

import { useState, useEffect } from "react";
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow,
} from "@vis.gl/react-google-maps";

export default function DemoMap() {
    const [currentPosition, setCurrentPosition] = useState(null);
    const [showCurrentMarker, setShowCurrentMarker] = useState(false);
    const [infoWindowOpen, setInfoWindowOpen] = useState(false); // Define infoWindowOpen state

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

    const indoorMapMarker = { lat: 38.36507855254162, lng: -75.6020517449648 };
    const initialPosition = { lat: 38.36514, lng: -75.60210 };
    const bounds = {
        north: 38.36532,
        south: 38.36466,
        east: -75.60169,
        west: -75.60243,
    };

    /* Function that checks user location and determines if they are within the property boundaries */
    const checkBounds = ({ lat, lng }) => {
        return lat >= bounds.south && lat <= bounds.north &&
            lng >= bounds.west && lng <= bounds.east;
    };

    /* On Click function that handles a click of the indoor map marker */
    const handleMarkerClick = () => {
        const url = "https://app.mappedin.com/map/66705274ba9455000bd6fc21";
        window.open(url, "_blank");
    };

    /* Function to handle marker hover */
    const handleMarkerHover = () => {
        setInfoWindowOpen(true);
    };

    /* Function to handle closing the info window */
    const handleInfoWindowClose = () => {
        setInfoWindowOpen(false);
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

                                        {/* Marker for indoorm map */}
                                        <AdvancedMarker position={indoorMapMarker} onClick={handleMarkerClick} onMouseOver={handleMarkerHover}
                        onMouseOut={handleInfoWindowClose}>
                        <Pin background={"orange"} borderColor={"black"} glyphColor={"white"}></Pin>
                    </AdvancedMarker>

                    {/* InfoWindow for indoor map marker */}
                    {infoWindowOpen && (
                        <InfoWindow
                            anchor={indoorMapMarker}
                            onCloseClick={handleInfoWindowClose}
                        >
                            <div style={{ backgroundColor: "white", padding: "10px" }}>
                                <p style={{ margin: 0, color: "black" }}>Click here for indoor map</p>
                            </div>
                        </InfoWindow>
                    )}

                    {showCurrentMarker && (
                        <AdvancedMarker position={currentPosition}>
                            <Pin background={"transparent"} borderColor={"white"} glyphColor={"blue"}></Pin>
                        </AdvancedMarker>
                    )}

                    {/* Marker for initial position when not within bounds */}
                    {!showCurrentMarker && (
                        <AdvancedMarker position={initialPosition}>
                            <Pin background={"transparent"} borderColor={"white"} glyphColor={"red"}></Pin>
                        </AdvancedMarker>
                    )}

                </Map>
            </div>
        </APIProvider>
    );
}
