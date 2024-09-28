"use client";
import { useState, useRef, useEffect } from "react";
import { APIProvider, Map, Marker, InfoWindow, useMap , useMapsLibrary } from "@vis.gl/react-google-maps";

const apiKey = process.env.REACT_APP_API_KEY;
const mapId = process.env.REACT_APP_MAP_ID;

export default function FreeMovingMap() {
    const initialPosition = { lat: 38.36530757341981, lng: -75.60163592504408 };

    const markers = [
        {
            id: 1,
            position: { lat: 38.365250007876, lng: -75.60193485449949 },
            title: "Rommel Center",
            description: "Visit the Rommel Center for various resources and events.",
            imageUrl: "https://0utwqfl7.cdn.imgeng.in/academic-offices/business/entrepreneurship-competitions/programs/_images/suec-reception.jpg",
            infoLink: "https://www.salisbury.edu/academic-offices/business/entrepreneurship-competitions/programs/",
            indoorMap: "https://app.mappedin.com/map/66ba3373ef3ac6000be8a53c",
            icon: {
                url: "https://cdn-icons-png.flaticon.com/512/10266/10266266.png",
                scaledSize: { width: 35, height: 35 },
            },
        },
        {
            id: 2,
            position: { lat: 38.365285990594046, lng: -75.6004960811191 },
            title: "Two Scoops IceCream",
            description: "Two Scoops Ice Cream & Waffles is a one of a kind ice-cream parlor and gift shop located in Downtown Salisbury.",
            imageUrl: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/28/92/38/81/outside-seating-two-scoops.jpg?w=1100&h=-1&s=1",
            infoLink: "https://www.facebook.com/twoscoopssby/",
            icon: {
                url: "https://downtownsby.com/wp-content/uploads/2021/10/Two-Scoops-Ice-Cream-Waffels.jpg",
                scaledSize: { width: 35, height: 35 },
            },
        },
    ];

    const mapRef = useRef(null);
    const [activeMarkerId, setActiveMarkerId] = useState(null);

    const handleMarkerClick = (id) => {
        setActiveMarkerId(id);
    };

    const handleInfoWindowClose = () => {
        setActiveMarkerId(null);
    };

    return (
        <div className="returnedContent">
            <APIProvider apiKey={apiKey}>
                <div style={{ height: "100vh", width: "80vw", marginLeft: "20vw", position: "relative" }}>
                    <Map
                        defaultZoom={17}
                        defaultCenter={initialPosition}
                        mapId={mapId}
                        options={{
                            draggable: true,
                            gestureHandling: "greedy",
                            scrollwheel: true,
                            disableDefaultUI: false,
                        }}
                        onLoad={(map) => {
                            mapRef.current = map;
                        }}
                    >
                        {/* Pass the first and second markers as origin and destination */}
                        <Directions originMarker={markers[0]} destinationMarker={markers[1]} />

                        {markers.map((marker) => (
                            <Marker
                                key={marker.id}
                                position={marker.position}
                                title={marker.title}
                                icon={marker.icon}
                                onClick={() => handleMarkerClick(marker.id)}
                            />
                        ))}

                        {activeMarkerId !== null && (
                            <InfoWindow
                                position={markers.find((marker) => marker.id === activeMarkerId).position}
                                onCloseClick={handleInfoWindowClose}
                            >
                                <div style={{ width: "400px" }}>
                                    <h4 style={{ margin: "0", marginBottom: "20px", fontSize: "16px" }}>
                                        {markers.find((marker) => marker.id === activeMarkerId).title}
                                    </h4>
                                    <img
                                        src={markers.find((marker) => marker.id === activeMarkerId).imageUrl}
                                        alt={markers.find((marker) => marker.id === activeMarkerId).title}
                                        style={{ width: "100%", height: "auto", borderRadius: "5px" }}
                                    />
                                    <p>{markers.find((marker) => marker.id === activeMarkerId).description}</p>

                                    <div style={{ marginTop: "10px" }}>
                                        <a
                                            href={markers.find((marker) => marker.id === activeMarkerId).infoLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ textDecoration: "none", color: "#007BFF", fontSize: "16px" }}
                                        >
                                            More Information
                                        </a>
                                    </div>
                                    <div style={{ marginTop: "10px" }}>
                                        <a
                                            href={markers.find((marker) => marker.id === activeMarkerId).indoorMap}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ textDecoration: "none", color: "#007BFF", fontSize: "16px" }}
                                        >
                                            Indoor Map
                                        </a>
                                    </div>
                                </div>
                            </InfoWindow>
                        )}
                    </Map>
                </div>
            </APIProvider>
        </div>
    );
}


function Directions({ originMarker, destinationMarker }) {
    const map = useMap();
    const [directionsService, setDirectionsService] = useState(null);
    const [directionsRenderer, setDirectionsRenderer] = useState(null);

    useEffect(() => {
        if (!window.google || !map) return;

        const service = new window.google.maps.DirectionsService();
        const renderer = new window.google.maps.DirectionsRenderer({
            map: map, // Render on the provided map
        });

        setDirectionsService(service);
        setDirectionsRenderer(renderer);
    }, [map]);

    useEffect(() => {
        if (!directionsService || !directionsRenderer || !originMarker || !destinationMarker) return;

        directionsService.route(
            {
                origin: originMarker.position, // Use the position of the origin marker
                destination: destinationMarker.position, // Use the position of the destination marker
                travelMode: window.google.maps.TravelMode.WALKING,
                provideRouteAlternatives: true,
            },
            (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK) {
                    directionsRenderer.setDirections(result);
                } else {
                    console.error(`Error fetching directions ${status}`);
                }
            }
        );
    }, [directionsService, directionsRenderer, originMarker, destinationMarker]);

    return null;
}






