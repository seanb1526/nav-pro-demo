"use client";

import { useState } from "react";
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow,
} from "@vis.gl/react-google-maps"

export default function demoMap() {
    const position = { lat: 38.36514, lng: -75.60210 }

    return <APIProvider apiKey={"AIzaSyCUF5Jgaynpno29mmmDPUzsTlz82CwxJ6Q"}>
        <div style={{height: "600px", width: "600px"}}>   /* The styling does not work */
            <Map zoom={16} center={position} mapId={"e9c9c121873f7673"}>
                <AdvancedMarker position={position}>
                    <Pin background={"red"} borderColor={"gold"} glyphColor={"gold"}></Pin>
                </AdvancedMarker>
            </Map>
        </div>
    </APIProvider>
}