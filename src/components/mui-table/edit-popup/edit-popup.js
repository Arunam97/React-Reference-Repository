import React, { useEffect, useRef, useState } from "react";
import { TextField, Box, Button } from "@mui/material";
import { useGridApiContext } from "@mui/x-data-grid";

const EditPopup = ({ id, value, field }) => {
  const apiRef = useGridApiContext();
  const ref = useRef(null);
  const [inputValue, setInputValue] = useState(value);
  const [isLastRow, setIsLastRow] = useState(false);
  const [cellWidth, setCellWidth] = useState(0);
  const [cellHeight, setCellHeight] = useState(0);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSave = () => {
    apiRef.current.setEditCellValue(
      { id, field, value: inputValue },
      null,
      true
    );
    apiRef.current.stopCellEditMode({ id, field });
  };

  const handleCancel = () => {
    apiRef.current.stopCellEditMode({ id, field, ignoreModifications: true });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSave();
    }
  };

  useEffect(() => {
    ref.current.style.position = "absolute";

    // Code to check if the last row is being edited
    const rowCount = apiRef.current.getRowsCount();
    const allRows = apiRef.current.getAllRowIds();
    const lastRowId = allRows[rowCount - 1];
    setIsLastRow(id === lastRowId);

    // Code to place the popup box with buttons
    const cell = apiRef.current.getCellElement(id, field);
    if (cell && ref.current) {
      const cellRect = cell.getBoundingClientRect();
      const gridRect =
        apiRef.current.rootElementRef.current.getBoundingClientRect();

      ref.current.style.top = `${cellRect.top - gridRect.top - 55}px`;
    }

    // Code to store the height and width of the cell being edited currently
    if (apiRef && apiRef.current) {
      const cell = apiRef.current.getCellElement(id, field);
      if (cell) {
        const { width, height } = cell.getBoundingClientRect();
        setCellWidth(width);
        setCellHeight(height);
      }
    }
  }, [apiRef, id, field, isLastRow]);

  return (
    <Box
      ref={ref}
      sx={{
        p: 1,
        bgcolor: "background.paper",
        borderRadius: 1,
        boxShadow: 3,
        height: isLastRow ? cellHeight * 0.6 : "inherit",
        width: cellWidth * 0.94
      }}
      onKeyDown={handleKeyDown}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: isLastRow ? "row" : "column",
          alignItems: "flex-start",
          justifyContent: "center",
          gap: 1
        }}
      >
        <TextField
          value={inputValue}
          onChange={handleChange}
          size="small"
          variant="standard"
        />
        <Box display="flex" justifyContent="space-around" width="100%">
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EditPopup;
