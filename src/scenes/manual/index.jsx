import React, { useRef, useState } from "react";
import { Box, Input, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";

const ManualControl = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Control Manual" subtitle="Control de actuadores" />
      </Box>
    </Box>
  );
};

export default ManualControl;
