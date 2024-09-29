import { useState, useRef, useEffect } from "react";
import { APIProvider, Map, Marker, InfoWindow, useMap } from "@vis.gl/react-google-maps";

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
    const [origin, setOrigin] = useState(markers[0]);
    const [destination, setDestination] = useState(markers[1]);
    const [directionsVisible, setDirectionsVisible] = useState(false);

    const handleMarkerClick = (id) => {
        setActiveMarkerId(id);
    };

    const handleInfoWindowClose = () => {
        setActiveMarkerId(null);
    };

    const handleDirectionsChange = () => {
        setDirectionsVisible(true);
    };

    const handleRemoveDirections = () => {
        setDirectionsVisible(false);
    };

    return (
        <div className="returnedContent">
            <APIProvider apiKey={apiKey}>
                <div style={{ height: "100vh", display: "flex" }}>
                    {/* Left-side panel with info window and business directory */}
                    <div style={{ width: "30vw", padding: "10px", marginTop: "10px", display: "flex", flexDirection: "column", justifyContent: "space-between", borderRight: "1px solid #ccc" }}>

                        {/* Info Window section */}
                        <div style={{ flex: 1, overflowY: "auto" }}>
                            {activeMarkerId && (
                                <div>
                                    <h4 style={{ margin: "0", fontSize: "18px" }}>{markers.find(marker => marker.id === activeMarkerId).title}</h4>
                                    <img
                                        src={markers.find(marker => marker.id === activeMarkerId).imageUrl}
                                        alt={markers.find(marker => marker.id === activeMarkerId).title}
                                        style={{ width: "100%", maxHeight: "150px", objectFit: "cover", borderRadius: "5px", marginTop: "10px" }}
                                    />
                                    <p>{markers.find(marker => marker.id === activeMarkerId).description}</p>
                                    <a href={markers.find(marker => marker.id === activeMarkerId).infoLink} target="_blank" rel="noopener noreferrer">More Information</a>
                                    <br />
                                    <a href={markers.find(marker => marker.id === activeMarkerId).indoorMap} target="_blank" rel="noopener noreferrer">Indoor Map</a>
                                </div>
                            )}
                        </div>

                        {/* Business Directory Section */}
                        <div style={{ flex: 1, overflowY: "auto" }}>
                            <h4>Business Directory</h4>
                            <ul style={{ listStyleType: "none", padding: 0 }}>
                                {markers.map((marker) => (
                                    <li key={marker.id} style={{ display: "flex", alignItems: "center", marginBottom: "10px", cursor: "pointer" }} onClick={() => handleMarkerClick(marker.id)}>
                                        <img src={marker.icon.url} alt={marker.title} style={{ width: "35px", height: "35px", marginRight: "10px" }} />
                                        <span>{marker.title}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Map */}
                    <div style={{ height: "100vh", width: "70vw", position: "relative" }}>
                        <div style={{ position: "absolute", top: "10px", left: "10px", zIndex: 1, display: "flex", gap: "10px", alignItems: "center" }}>
                            <select
                                value={origin.id}
                                onChange={(e) => setOrigin(markers.find(marker => marker.id === Number(e.target.value)))}
                                style={{
                                    padding: "10px 15px",
                                    fontSize: "16px",
                                    borderRadius: "8px",
                                    border: "1px solid #ccc",
                                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                                    cursor: "pointer",
                                    outline: "none",
                                }}
                            >
                                {markers.map(marker => (
                                    <option key={marker.id} value={marker.id}>{marker.title}</option>
                                ))}
                            </select>

                            <select
                                value={destination.id}
                                onChange={(e) => setDestination(markers.find(marker => marker.id === Number(e.target.value)))}
                                style={{
                                    padding: "10px 15px",
                                    fontSize: "16px",
                                    borderRadius: "8px",
                                    border: "1px solid #ccc",
                                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                                    cursor: "pointer",
                                    outline: "none",
                                }}
                            >
                                {markers.map(marker => (
                                    <option key={marker.id} value={marker.id}>{marker.title}</option>
                                ))}
                            </select>

                            <button
                                onClick={handleDirectionsChange}
                                style={{
                                    padding: "10px 20px",
                                    fontSize: "16px",
                                    backgroundColor: "#007bff",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                                    transition: "background-color 0.3s ease",
                                }}
                            >
                                Get Directions
                            </button>

                            {directionsVisible && (
                                <button
                                    onClick={handleRemoveDirections}
                                    style={{
                                        padding: "10px 20px",
                                        fontSize: "16px",
                                        backgroundColor: "#dc3545",
                                        color: "#fff",
                                        border: "none",
                                        borderRadius: "8px",
                                        cursor: "pointer",
                                        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                                        transition: "background-color 0.3s ease",
                                        marginLeft: "10px",
                                    }}
                                >
                                    Remove Directions
                                </button>
                            )}
                        </div>


                        <Map
                            defaultZoom={17}
                            defaultCenter={initialPosition}
                            mapId={mapId}
                            options={{
                                draggable: true,
                                gestureHandling: "greedy",
                                scrollwheel: true,
                                disableDefaultUI: false,
                                mapTypeControl: false, // Disable the Map/Satellite buttons
                            }}
                            onLoad={(map) => {
                                mapRef.current = map;
                            }}
                        >
                            {directionsVisible && (
                                <Directions originMarker={origin} destinationMarker={destination} />
                            )}

                            {markers.map((marker) => (
                                <Marker
                                    key={marker.id}
                                    position={marker.position}
                                    title={marker.title}
                                    icon={marker.icon}
                                    onClick={() => handleMarkerClick(marker.id)}
                                />
                            ))}
                        </Map>
                    </div>
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
            map: map,
        });

        setDirectionsService(service);
        setDirectionsRenderer(renderer);
    }, [map]);

    useEffect(() => {
        if (!directionsService || !directionsRenderer || !originMarker || !destinationMarker) return;

        directionsService.route(
            {
                origin: originMarker.position,
                destination: destinationMarker.position,
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

        return () => {
            directionsRenderer.setMap(null);
        };
    }, [directionsService, directionsRenderer, originMarker, destinationMarker]);

    return null;
}

