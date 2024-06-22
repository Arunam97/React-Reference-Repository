const container = {
  display: "flex",
  flexDirection: "row",
  gap: "1rem",
  height: "100%"
};

const uploadContainer = {
  border: "2px dashed gray",
  width: "40%",
  textAlign: "center",
  cursor: "pointer",
  padding: "20px",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "1rem"
};

const searchContainer = {
  width: "60%",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  overflow: "auto"
};

const styles = { container, uploadContainer, searchContainer };

export default styles;
