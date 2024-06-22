import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  Box,
  TextField,
  Link,
  Typography,
  Snackbar,
  Alert,
  Button,
  IconButton,
  InputAdornment
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import AttachFileIcon from "@mui/icons-material/AttachFile";

import styles from "./file-upload.styles";

const FileUpload = ({
  filesMetadata,
  uploadHandler,
  deleteHandler,
  acceptedFileTypes = []
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [fileTypeError, setFileTypeError] = useState("");

  useEffect(() => {
    const sortedFiles = [...filesMetadata].sort(
      (a, b) => new Date(b.uploadDate) - new Date(a.uploadDate)
    );
    setFilteredFiles(
      sortedFiles.filter((file) =>
        file.fileName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [filesMetadata, searchTerm]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const isFileTypeValid = (file) =>
        acceptedFileTypes.length === 0 || acceptedFileTypes.includes(file.type);
      const invalidFiles = acceptedFiles.filter(
        (file) => !isFileTypeValid(file)
      );
      const validFiles = acceptedFiles.filter(isFileTypeValid);

      if (invalidFiles.length > 0) {
        const fileTypeDescriptions = acceptedFileTypes.map(
          (type) => type.split("/")[1]
        );
        setFileTypeError(
          `Accepted file types are: ${fileTypeDescriptions.join(", ") || "All"}`
        );
        setSnackbarOpen(true);
      }

      if (validFiles.length > 0) {
        uploadHandler(validFiles);
      }
    },
    [uploadHandler, acceptedFileTypes]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: acceptedFileTypes.join(", ")
  });

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const formatDateAndTime = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric"
    });
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });

    // Extract timezone from toLocaleTimeString and convert to 3-letter abbreviation
    const timezone = date
      .toLocaleTimeString("en-us", { timeZoneName: "short" })
      .split(" ")[2];

    return `${formattedDate} on ${formattedTime} ${timezone}`;
  };

  return (
    <Box sx={styles.container}>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={10000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {fileTypeError}
        </Alert>
      </Snackbar>
      <Box {...getRootProps()} sx={styles.uploadContainer}>
        <Typography>Drag and Drop files here</Typography>
        <InsertDriveFileOutlinedIcon sx={{ fontSize: 60 }} />
        <Typography>Or</Typography>
        <input
          {...getInputProps()}
          id="file-upload-input"
          style={{ display: "none" }}
        />
        <Button
          variant="outlined"
          onClick={() => document.getElementById("file-upload-input").click()}
        >
          Browse
        </Button>
      </Box>
      <Box sx={styles.searchContainer}>
        <TextField
          sx={{ width: "70%" }}
          label="Search Files"
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
        <Typography sx={{ marginTop: "1rem" }}>
          Files Attached from Case
        </Typography>
        <Box>
          {filteredFiles.map((file, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "flex-start",
                flexDirection: "column",
                marginTop: "4px"
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%"
                }}
              >
                <Link
                  href={file.fileUrl}
                  download={file.fileName}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textDecoration: "none"
                  }}
                >
                  <AttachFileIcon
                    sx={{ verticalAlign: "middle", marginRight: "1rem" }}
                  />
                  {file.fileName}
                </Link>
                <IconButton onClick={() => deleteHandler(file.id)} size="small">
                  <DeleteIcon />
                </IconButton>
              </Box>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{
                  marginLeft: "2.5rem"
                }}
              >
                {`Uploaded by ${file.uploadedBy}, on ${formatDateAndTime(
                  file.uploadDate
                )}`}
              </Typography>
            </Box>
          ))}
          {filteredFiles.length === 0 && (
            <Typography
              variant="body1"
              sx={{ textAlign: "center", width: "100%" }}
            >
              No files found.
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default FileUpload;
