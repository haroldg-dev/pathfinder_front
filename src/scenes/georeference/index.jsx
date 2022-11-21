import React, { useRef, useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { StlViewer } from "./model-viewer";
//import io from "socket.io-client";

const STLload = () => {
  //const [socket, setSocket] = useState(null);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  //const socket = io.connect("http://localhost:4000");
  /* useEffect(() => {
    const newSocket = io(`http://localhost:4000`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]); */

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="GEOREFERENCE" subtitle="Monitoring georeference" />
      </Box>
      <Box display="flex" alignItems="center">
        <StlViewer />
      </Box>
    </Box>
  );
};
export default STLload;
