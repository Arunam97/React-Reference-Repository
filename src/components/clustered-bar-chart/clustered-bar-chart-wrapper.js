import StackedBarChart from "./clustered-bar-chart";
import { Box } from "@mui/material";
import { data } from "./data";
import { config } from "./config";

const StackedBarChartWrapper = () => {
  return (
    <Box sx={{ height: "400px", overflow: "auto" }}>
      <StackedBarChart config={config(data)} />
    </Box>
  );
};

export default StackedBarChartWrapper;
