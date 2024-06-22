import React, { useState, useEffect } from "react";
import FileUpload from "./file-upload";

import { Box } from "@mui/material";

const FileUploadWrapper = () => {
  const [filesMetadata, setFilesMetadata] = useState([]);
  const [fileIdCounter, setFileIdCounter] = useState(0);

  useEffect(() => {
    const savedFiles = JSON.parse(localStorage.getItem("mockDatabase")) || [];
    setFilesMetadata(savedFiles);
    // Initialize counter based on the existing files (this assumes files are never removed from localStorage on refresh/reset)
    if (savedFiles.length > 0) {
      const maxId = Math.max(...savedFiles.map((file) => file.id));
      setFileIdCounter(maxId + 1);
    }
  }, []);

  const uploadHandler = (newFiles) => {
    const updatedFiles = [...filesMetadata];
    let newFileIdCounter = fileIdCounter;

    newFiles.forEach((file) => {
      const fileMetadata = {
        id: newFileIdCounter,
        fileName: file.name,
        fileSize: file.size,
        uploadDate: new Date().toISOString(),
        uploadedBy: "currentUser",
        fileUrl: URL.createObjectURL(file)
      };
      updatedFiles.push(fileMetadata);
      newFileIdCounter++; // Increment the local counter
    });

    setFilesMetadata(updatedFiles);
    setFileIdCounter(newFileIdCounter); // Update the state once with the new counter
    localStorage.setItem("mockDatabase", JSON.stringify(updatedFiles));
  };

  const deleteHandler = (fileId) => {
    const updatedFiles = filesMetadata.filter((file) => file.id !== fileId);
    setFilesMetadata(updatedFiles);
    localStorage.setItem("mockDatabase", JSON.stringify(updatedFiles));
  };

  return (
    <Box sx={{ width: "70%", height: "400px" }}>
      <FileUpload
        filesMetadata={filesMetadata}
        uploadHandler={uploadHandler}
        deleteHandler={deleteHandler}
        acceptedFileTypes={["application/pdf"]}
      />
    </Box>
  );
};

export default FileUploadWrapper;
