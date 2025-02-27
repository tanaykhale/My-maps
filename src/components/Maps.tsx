import { useEffect, useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

interface Place {
  lat: number;
  lng: number;
}

interface MapProps {
  selectedPlace: Place;
}
const center = {
  lat: 0,
  lng: 0,
};

const Map = ({ selectedPlace }: MapProps) => {
  const [currentLocation, setCurrentLocation] = useState(center);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => alert("Error getting location")
      );
    }
  }, []);
  useEffect(() => {
    if (selectedPlace.lat !== 0 && selectedPlace.lng !== 0) {
      setCurrentLocation(selectedPlace);
    }
  }, [selectedPlace]);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={currentLocation}
      zoom={15}
    >
      <Marker position={currentLocation} />
    </GoogleMap>
  );
};

export default Map;
