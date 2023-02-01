import React, { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import MapViewer from "../../components/Mapviewer";

const Navigation = ({ socket }) => {
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
          id: 4,s
          position: { lat: -12.070234, lng:  }
        }
    ]; */

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
      <MapViewer sock={socket} />
    </Box>
  );
};

export default Navigation;
