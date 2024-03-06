"use client"

import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useRef, useState } from "react";

export default function Map() {
    const mapRef = useRef<HTMLDivElement>(null);
    const [markerPosition, setMarkerPosition] = useState<{ lat: number, lng: number }>({ lat:  -11.933333333333, lng: -77.066666666667 });

    useEffect(() => {
        const initializeMap = async () => {
            const loader = new Loader({
                apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
                version: "quartely",
            });

            const { Map } = await loader.importLibrary('maps');
            //init a marker
            const { Marker } = await loader.importLibrary('marker') as google.maps.MarkerLibrary;

            const locationInMap = { lat:  -11.933333333333, lng: -77.066666666667 };

            const mapOptions: google.maps.MapOptions = {
                center: locationInMap,
                zoom: 16,
                mapId: 'NEXT_MAPS_TUTS'
            };

            const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

            const marker = new Marker({
                map: map,
                position: markerPosition,
                title: "Lima"
            });

            map.addListener('click', (event: { latLng: { lat: () => any; lng: () => any; }; }) => {
                const clickedPosition = {
                    lat: event.latLng.lat(),
                    lng: event.latLng.lng()
                };

                // Update marker position
                marker.setPosition(clickedPosition);

                // Update state
                setMarkerPosition(clickedPosition);
            });

        }

        initializeMap();
    }, [])

    return (
        <div style={{ height: "100vh", width: "100%" }} ref={mapRef}></div>
    );
}