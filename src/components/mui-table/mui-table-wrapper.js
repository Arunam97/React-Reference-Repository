import MuiDataGrid from "./data-grid/mui-data-grid";
import { columnDefs } from "./mui-data-grid-columnDefs";
import { data } from "./mui-data-grid-data";
import { Box } from "@mui/material";

const MuiTableWrapper = () => {
  const processRowUpdate = (updatedRow, originalRow) => {
    console.log("Updated Row:", updatedRow);
    console.log("Original Row:", originalRow);
    return updatedRow;
  };

  const onProcessRowUpdateError = (params) => {
    console.log("Error updating row", params);
  };

  return (
    <Box>
      <MuiDataGrid
        columns={columnDefs}
        rows={data}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={onProcessRowUpdateError}
      />
    </Box>
  );
};

export default MuiTableWrapper;
