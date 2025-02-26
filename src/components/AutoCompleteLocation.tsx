import { useEffect, useRef, useState } from "react";
import { GoogleMap, LoadScript, Autocomplete } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = { lat: 0, lng: 0 };
const AutoCompleteLocation = () => {
  const [currentLocation, setCurrentLocation] = useState(center);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(
    null
  );
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentLocation(location);

          if (mapRef.current) {
            mapRef.current.setCenter(location);
          }

          if (markerRef.current) {
            markerRef.current.position = location;
          }
        },
        () => alert("Error getting location")
      );
    }
  }, []);

  const handleLoad = (map: google.maps.Map) => {
    mapRef.current = map;

    const marker = new google.maps.marker.AdvancedMarkerElement({
      position: currentLocation,
      map,
    });

    markerRef.current = marker;
  };

  const handlePlaceSelect = () => {
    const place = autocompleteRef.current?.getPlace();
    if (place?.geometry?.location) {
      const newLocation = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      setCurrentLocation(newLocation);

      if (mapRef.current) {
        mapRef.current.setCenter(newLocation);
      }

      if (markerRef.current) {
        markerRef.current.position = newLocation;
      }
    }
  };

  return (
    <>
      <LoadScript
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
        libraries={["places"]}
      >
        <div style={{ position: "relative", width: "100%", height: "100vh" }}>
          {/* Search Input */}
          <Autocomplete
            onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
            onPlaceChanged={handlePlaceSelect}
            options={{ types: ["(cities)"] }}
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="Search for a city..."
              style={{
                position: "absolute",
                top: "10px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "300px",
                padding: "10px",
                fontSize: "16px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </Autocomplete>

          {/* Google Map */}
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={currentLocation}
            zoom={12}
            onLoad={handleLoad}
          />
        </div>
      </LoadScript>
    </>
  );
};

export default AutoCompleteLocation;
