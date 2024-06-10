// FileUploadWrapper.js
import React, { useState, useEffect } from "react";
import FileUpload from "./file-upload";

const FileUploadWrapper = () => {
  const [filesMetadata, setFilesMetadata] = useState([]);

  useEffect(() => {
    // Load files from mock "database" (local storage)
    const savedFiles = JSON.parse(localStorage.getItem("mockDatabase")) || [];
    setFilesMetadata(savedFiles);
  }, []);

  const uploadHandler = (newFiles) => {
    const updatedFiles = [...filesMetadata];
    newFiles.forEach((file) => {
      const fileMetadata = {
        fileName: file.name,
        fileSize: file.size,
        uploadDate: new Date().toISOString(),
        uploadedBy: "currentUser", // This should be dynamically set based on your user management system
        fileUrl: URL.createObjectURL(file) // Create a URL for each file
      };
      updatedFiles.push(fileMetadata);
    });
    setFilesMetadata(updatedFiles);
    // Simulate storing to a "database" by using local storage
    localStorage.setItem("mockDatabase", JSON.stringify(updatedFiles));
  };

  return (
    <FileUpload
      filesMetadata={filesMetadata}
      uploadHandler={uploadHandler}
      acceptedFileTypes={["pdf"]}
    />
  );
};

export default FileUploadWrapper;
