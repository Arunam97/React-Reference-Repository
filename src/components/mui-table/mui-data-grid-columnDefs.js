import EditPopup from "./edit-popup/edit-popup";
import EditCell from "./edit-cell/edit-cell";

export const columnDefs = [
  {
    field: "caseNumber",
    headerName: "Case Number",
    type: "number",
    flex: 1,
    align: "left",
    headerAlign: "left"
  },
  {
    field: "first_name",
    headerName: "First name",
    type: "string",
    flex: 1,
    align: "left",
    headerAlign: "left",
    editable: true,
    renderCell: (params) => <EditCell {...params} />,
    renderEditCell: (params) => <EditPopup {...params} />
  },
  {
    field: "last_name",
    headerName: "Last name",
    type: "string",
    flex: 1,
    align: "left",
    headerAlign: "left"
  },
  {
    field: "email",
    headerName: "Email",
    type: "string",
    flex: 1,
    align: "left",
    headerAlign: "left"
  }
];
