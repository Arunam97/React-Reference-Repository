import React from "react";
import { Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const EditCell = ({ value }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        "& .edit-icon": {
          visibility: "hidden"
        },
        "&:hover .edit-icon": {
          visibility: "visible"
        }
      }}
    >
      <span>{value}</span>
      <IconButton
        size="small"
        className="edit-icon"
        sx={{ cursor: "default" }}
        disableRipple
      >
        <EditIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default EditCell;
