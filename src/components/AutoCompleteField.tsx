import { StandaloneSearchBox } from "@react-google-maps/api";
import { useRef } from "react";

interface Place {
  lat: number;
  lng: number;
}

interface AutoCompleteFieldProps {
  setSelectedPlace: (place: Place) => void;
}

const AutoCompleteField = ({ setSelectedPlace }: AutoCompleteFieldProps) => {
  const inputref = useRef<google.maps.places.SearchBox | null>(null);

  const handleOnPlacesChanged = () => {
    if (inputref.current) {
      let places = inputref.current.getPlaces();
      console.log(places);
      if (places && places.length > 0) {
        const place = places[0];
        const location = place.geometry?.location;
        if (location) {
          setSelectedPlace({
            lat: location.lat(),
            lng: location.lng(),
          });
        }
      }
    } else {
      console.error("SearchBox reference is null");
    }
  };

  return (
    <div>
      <StandaloneSearchBox
        onLoad={(ref) => (inputref.current = ref)}
        onPlacesChanged={handleOnPlacesChanged}
      >
        <input
          type="text"
          placeholder="Start typing your address"
          style={{
            boxSizing: "border-box",
            border: "1px solid transparent",
            width: "50%",
            height: "50px",
            padding: "0 12px",
            borderRadius: "3px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
            fontSize: "16px",
            outline: "none",
            textOverflow: "ellipses",
            marginTop: "30px",
          }}
        />
      </StandaloneSearchBox>
    </div>
  );
};

export default AutoCompleteField;
