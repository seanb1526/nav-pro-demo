"use client";
import { useState, useRef } from "react";
import { APIProvider, Map, Marker, InfoWindow } from "@vis.gl/react-google-maps";

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
            }
        },
        {
            id: 2,
            position: { lat: 38.365285990594046, lng: -75.6004960811191 }, // Example coordinates for another marker
            title: "Two Scoops IceCream",
            description: "Two Scoops Ice Cream & Waffles is a one of a kind ice-cream parlor and gift shop located in Downtown Salisbury.",
            imageUrl: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/28/92/38/81/outside-seating-two-scoops.jpg?w=1100&h=-1&s=1", // Replace with an actual image URL
            infoLink: "https://www.facebook.com/twoscoopssby/", // Replace with an actual link
            icon: {
                url: "https://downtownsby.com/wp-content/uploads/2021/10/Two-Scoops-Ice-Cream-Waffels.jpg", // Another unique icon
                scaledSize: { width: 35, height: 35 },
            }
        },
        // Add more markers with unique icons as needed
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
                        {markers.map(marker => (
                            <Marker
                                key={marker.id}
                                position={marker.position}
                                title={marker.title}
                                icon={marker.icon} // Use the icon from the marker object
                                onClick={() => handleMarkerClick(marker.id)}
                            />
                        ))}

                        {activeMarkerId !== null && (
                            <InfoWindow
                                position={markers.find(marker => marker.id === activeMarkerId).position}
                                onCloseClick={handleInfoWindowClose}
                            >
                                <div style={{ width: '400px' }}>
                                    <h4 style={{ margin: '0', marginBottom: '20px', 'font-size': '16px' }}>{markers.find(marker => marker.id === activeMarkerId).title}</h4>
                                    <img
                                        src={markers.find(marker => marker.id === activeMarkerId).imageUrl}
                                        alt={markers.find(marker => marker.id === activeMarkerId).title}
                                        style={{ width: '100%', height: 'auto', borderRadius: '5px' }}
                                    />
                                    <p>{markers.find(marker => marker.id === activeMarkerId).description}</p>

                                    <div style={{ marginTop: '10px' }}>
                                        <a
                                            href={markers.find(marker => marker.id === activeMarkerId).infoLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ textDecoration: 'none', color: '#007BFF', 'font-size': '16px' }}
                                        >
                                            More Information
                                        </a>
                                    </div>
                                    <div style={{ marginTop: '10px' }}>
                                        <a
                                            href={markers.find(marker => marker.id === activeMarkerId).indoorMap}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ textDecoration: 'none', color: '#007BFF', 'font-size': '16px' }}
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





