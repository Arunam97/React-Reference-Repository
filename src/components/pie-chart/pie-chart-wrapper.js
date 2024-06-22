import React from "react";
import PieChart from "./pie-chart";
import { config } from "./config";
import { data } from "./data";
import { Box } from "@mui/material";

const PieChartWrapper = () => {
  return (
    <Box sx={{ height: "400px", width: "400px", border: "solid red" }}>
      <PieChart config={config} data={data} />
    </Box>
  );
};

export default PieChartWrapper;
