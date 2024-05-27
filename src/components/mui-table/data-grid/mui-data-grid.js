import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const MuiDataGrid = ({
  columns,
  rows,
  processRowUpdate = (updatedRow, originalRow) => {
    return updatedRow;
  },
  onProcessRowUpdateError = () => {},
  sx = {},
  columnHeaderStyle = {},
  columnHeaderTitleStyle = {},
  rowStyle = {},
  cellStyle = {},
  controlledFormConfig,
  ...other
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddRow = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleFormSubmit = (formData) => {
    const newRow = {};
    columns.forEach((column) => {
      newRow[column.field] = formData[column.field];
    });

    rows.push(newRow);
    setIsDialogOpen(false);
  };

  const rowsWithIds = rows.map((row, index) => ({ id: index, ...row }));

  // Extract the data object based on the columns definition
  const data = columns.reduce((acc, column) => {
    acc[column.field] = ""; // Initialize with an empty string for simplicity
    return acc;
  }, {});

  return (
    <>
      <Button onClick={handleAddRow} variant="outlined">
        Add Row
      </Button>
      <DataGrid
        rows={rowsWithIds}
        columns={columns}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={onProcessRowUpdateError}
        sx={{
          ...sx,
          "& .MuiDataGrid-columnHeader": {
            ...columnHeaderStyle
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            ...columnHeaderTitleStyle
          },
          "& .MuiDataGrid-row": { ...rowStyle },
          "& .MuiDataGrid-cell": { ...cellStyle }
        }}
        {...other}
      />
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Add Row</DialogTitle>
        <DialogContent>
          <ControlledForm
            config={controlledFormConfig}
            data={data}
            handleSubmit={handleFormSubmit}
            handleReset={handleCloseDialog} // Close dialog on reset
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MuiDataGrid;
