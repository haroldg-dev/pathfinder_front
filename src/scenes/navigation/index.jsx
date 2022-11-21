import React, { useRef, useState, useEffect } from "react";
import { Box, Input, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import axios from "axios";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const weather_endpoint = "https://api.openweathermap.org/data/2.5/weather?";
const weather_apikey = "d08b6a1a50b778c6d218428c496f096b";

const Navigation = () => {
  /* const markers = [
        {
          position: { lat: -12.073906, lng: }
        },
        {
          id: 2,
          position: { lat: -12.073465, lng: -77.159230 }
        },
        {
          id: 3,
          position: { lat: -12.072542, lng: -77.158157 }
        },
        {
          id: 4,
          position: { lat: -12.070234, lng:  }
        }
    ]; */

  /* if (!latitude) {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(parseFloat(position.coords.latitude));
      setLongitude(parseFloat(position.coords.longitude));
    });
  } */

  /* if (latitude && !responseData) {
    axios
      .get(
        `${weather_endpoint}lat=${latitude}&lon=${longitude}&appid=${weather_apikey}`
      )
      .then((response) => {
        setResponseData(response.data);
      });
  }
 */

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [latitude, setLatitude] = React.useState(0);
  const [longitude, setLongitude] = React.useState(0);
  const [responseData, setResponseData] = React.useState("");
  const [markerList, setMarkerList] = useState([]);
  const [inputLatitud, setInputLatitud] = useState("");
  const [inputLongitud, setInputLongitud] = useState("");

  useEffect(() => {
    markerList.map((item, i) => {
      setLatitude(latitude + item.position.lat);
      setLongitude(longitude + item.position.lng);
    });
  }, [markerList]);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyA9Uj24-1Hok4mp0u0MUoFEBtn4504uhVU",
  });

  if (!isLoaded) {
    return <Box>Loading.....</Box>;
  }

  const addmarker = () => {
    if (inputLatitud === "" || inputLongitud === "") {
      return;
    }
    setMarkerList([
      ...markerList,
      {
        position: {
          lat: parseFloat(inputLatitud),
          lng: parseFloat(inputLongitud),
        },
      },
    ]);
    setInputLatitud("");
    setInputLongitud("");
  };

  const handleChangeLat = (event) => {
    setInputLatitud(event.target.value);
  };
  const handleChangeLong = (event) => {
    setInputLongitud(event.target.value);
  };

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="Navegación"
          subtitle="Planeamiento y monitoreo de ruta "
        />
      </Box>
      {/* <Box display="flex" alignItems="center">
                <h1>{responseData.name}</h1>
            </Box> */}
      <Box position="relative">
        <Box position="absolute">
          <GoogleMap
            zoom={16}
            center={
              latitude
                ? longitude
                  ? {
                      lat: latitude / markerList.length,
                      lng: longitude / markerList.length,
                    }
                  : { lat: -12.073465, lng: -77.15923 }
                : { lat: -12.073465, lng: -77.15923 }
            }
            mapContainerStyle={{ width: "100vw", height: "70vh" }}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
          >
            {markerList != null &&
              markerList.map(({ position }, id) => (
                <Marker key={id} position={position}></Marker>
              ))}
          </GoogleMap>
        </Box>
        <Box
          position="relative"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            bgcolor={colors.primary[400]}
            m="20px"
            display="inline-flex"
            borderRadius="10px"
          >
            <Input
              type="text"
              placeholder="latitude"
              onChange={handleChangeLat}
              value={inputLatitud}
              sx={{ margin: "10px" }}
            />
            <Input
              type="text"
              placeholder="longitude"
              onChange={handleChangeLong}
              value={inputLongitud}
              sx={{ margin: "10px" }}
            />
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              onClick={addmarker}
              sx={{ margin: "10px" }}
            >
              Create Mark
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

function Map() {
  return;
}
export default Navigation;
