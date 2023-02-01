import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import DownloadOutlineIcon from "@mui/icons-material/DownloadOutlined";
import StatBox from "../../components/StatBox";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import SpeedIcon from "@mui/icons-material/Speed";
import BatterySaverIcon from "@mui/icons-material/BatterySaver";
import CloudOutlinedIcon from "@mui/icons-material/CloudOutlined";
import Stlviewer from "../../components/Stlviewer";
import MapViewer from "../../components/Mapviewer";
import React, { useEffect, useState } from "react";
import Terminal from "../../components/Terminal";

const Dashboard = ({ socket }) => {
  const [data, setData] = useState({});

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  console.log("dashboard");
  useEffect(() => {
    socket.on("xbee:sensores", (res) => {
      console.log(res);
      setData(res);
    });
    return () => {
      socket.off("xbee:sensores");
    };
  }, []);
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Dashboard" subtitle="Welcome to your dashboard" />
        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlineIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & BOX */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW1 */}
        <Box
          gridColumn="span 2"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={`${data.tempInterna} °C`}
            subtitle="Temperatura Interna"
            progress="0.75"
            increase="+14%"
            icon={
              <ThermostatIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 2"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={`${data.humedad}`}
            subtitle="Humedad"
            progress="0.50"
            increase="+21%"
            icon={
              <CloudOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 2"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={`${data.velViento} Nudos`}
            subtitle="Velocidad de Viento"
            progress="0.30"
            increase="+5%"
            icon={
              <SpeedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 2"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={`${data.dirViento} °`}
            subtitle="Dirección de Viento"
            progress="0.30"
            increase="+5%"
            icon={
              <SpeedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 2"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="80%"
            subtitle="Batteria 1"
            progress="0.80"
            increase="+43%"
            icon={
              <BatterySaverIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 2"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="80%"
            subtitle="Batteria 2"
            progress="0.80"
            increase="+43%"
            icon={
              <BatterySaverIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        {/* ROW2 */}
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
              Georeference
            </Typography>
          </Box>
          <Box height="385px" width="96%" ml="12px" marginTop="20px">
            <Stlviewer isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
              Navigation
            </Typography>
          </Box>
          <Box ml="-9px">
            <MapViewer isDashboard={true} sock={socket} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
              Consola
            </Typography>
          </Box>
          <Box height="100%" width="95%" ml="10px" mt="20px">
            <Terminal />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
