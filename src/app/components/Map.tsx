"use client"

import { Loader } from "@googlemaps/js-api-loader";
import { useEffect, useRef } from "react";

export default function Map() {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initializeMap = async () => {
            const loader = new Loader({
                apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
                version: "quartely",
            });

            const { Map } = await loader.importLibrary('maps');
            const locationInMap = { lat: -12.0463731, lng: -77.042754 };

            const mapOptions: google.maps.MapOptions = {
                center: locationInMap,
                zoom: 8,
                mapId: 'NEXT_MAPS_TUTS'
            };

            const map = new Map(mapRef.current as HTMLDivElement, mapOptions);

        }

        initializeMap();
    }, [])

    return (
        <div style={{ height: "100vh", width: "100%" }} ref={mapRef}></div>
    );
}