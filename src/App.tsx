import Maps from "./components/Maps";
import SearchBar from "./components/AutoCompleteField";
import { useJsApiLoader } from "@react-google-maps/api";
import { useState } from "react";
const App = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });
  const [selectedPlace, setSelectedPlace] = useState({ lat: 0, lng: 0 });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div>
        <SearchBar setSelectedPlace={setSelectedPlace}></SearchBar>
        <Maps selectedPlace={selectedPlace}></Maps>
      </div>
    </>
  );
};

export default App;
