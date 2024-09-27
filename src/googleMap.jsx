"use client";
import { useState, useRef } from "react";
import { APIProvider, Map, Marker, InfoWindow } from "@vis.gl/react-google-maps";

export default function FreeMovingMap() {
    const initialPosition = { lat: 38.36530757341981, lng: -75.60163592504408 };
    const markers = [
        {
            id: 1,
            position: { lat: 38.365250007876, lng: -75.60193485449949 },
            title: "Rommel Center",
            description: "Visit the Rommel Center for various resources and events.",
            imageUrl: "https://0utwqfl7.cdn.imgeng.in/academic-offices/business/entrepreneurship-competitions/programs/_images/suec-reception.jpg",
            infoLink: "https://www.salisbury.edu/academic-offices/business/entrepreneurship-competitions/programs/"
        },
        {
            id: 2,
            position: { lat: 38.36630757341981, lng: -75.60263592504408 }, // Example coordinates for another marker
            title: "Another Location",
            description: "Description for another location.",
            imageUrl: "https://example.com/image.jpg", // Replace with an actual image URL
            infoLink: "https://example.com" // Replace with an actual link
        }
        // Add more markers as needed
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
        <APIProvider apiKey={"AIzaSyCUF5Jgaynpno29mmmDPUzsTlz82CwxJ6Q"}>
            <div style={{ height: "600px", width: "600px" }}>
                <Map
                    defaultZoom={17}
                    defaultCenter={initialPosition}
                    mapId={"e9c9c121873f7673"}
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
                    {markers.map(marker => (
                        <Marker
                            key={marker.id}
                            position={marker.position}
                            title={marker.title}
                            icon={{
                                url: "https://cdn-icons-png.flaticon.com/512/10266/10266266.png",
                                scaledSize: { width: 25, height: 25 },
                            }}
                            onClick={() => handleMarkerClick(marker.id)}
                        />
                    ))}

                    {activeMarkerId !== null && (
                        <InfoWindow
                            position={markers.find(marker => marker.id === activeMarkerId).position}
                            onCloseClick={handleInfoWindowClose}
                        >
                            <div style={{ width: '200px' }}>
                                <h4 style={{ margin: '0' }}>{markers.find(marker => marker.id === activeMarkerId).title}</h4>
                                <p>{markers.find(marker => marker.id === activeMarkerId).description}</p>
                                <img
                                    src={markers.find(marker => marker.id === activeMarkerId).imageUrl}
                                    alt={markers.find(marker => marker.id === activeMarkerId).title}
                                    style={{ width: '100%', height: 'auto', borderRadius: '5px' }}
                                />
                                <div style={{ marginTop: '10px' }}>
                                    <a
                                        href={markers.find(marker => marker.id === activeMarkerId).infoLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ textDecoration: 'none', color: '#007BFF' }}
                                    >
                                        More Information
                                    </a>
                                </div>
                            </div>
                        </InfoWindow>
                    )}
                </Map>
            </div>
        </APIProvider>
    );
}




