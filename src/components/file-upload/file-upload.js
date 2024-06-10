import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  Box,
  TextField,
  List,
  ListItem,
  Link,
  Typography,
  Snackbar,
  Alert
} from "@mui/material";

const FileUpload = ({
  filesMetadata,
  uploadHandler,
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
          (type) => `.${type}`
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

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
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
    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
    return `${formattedDate} at ${formattedTime}`;
  };

  return (
    <Box display="flex" p={1} flexDirection="column" alignItems="center">
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
      <Box
        {...getRootProps()}
        p={1}
        flexGrow={1}
        style={{
          border: "2px dashed gray",
          padding: "20px",
          width: "100%",
          textAlign: "center",
          cursor: "pointer",
          WebkitUserSelect: "none",
          MozUserSelect: "none",
          msUserSelect: "none",
          userSelect: "none"
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <Typography>Drop the files here...</Typography>
        ) : (
          <Typography>Click or drag files to upload</Typography>
        )}
      </Box>
      <TextField
        fullWidth
        label="Search Files"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearch}
        margin="normal"
      />
      <Box mt={2} width="100%">
        <List>
          {filteredFiles.map((file, index) => (
            <ListItem key={index}>
              <Link href={file.fileUrl} download={file.fileName}>
                {file.fileName}
              </Link>
              <Typography variant="body2" color="textSecondary">
                {`Uploaded by ${file.uploadedBy}, on ${formatDateAndTime(
                  file.uploadDate
                )}`}
              </Typography>
            </ListItem>
          ))}
          {filteredFiles.length === 0 && (
            <Typography variant="body1">No files found.</Typography>
          )}
        </List>
      </Box>
    </Box>
  );
};

export default FileUpload;
