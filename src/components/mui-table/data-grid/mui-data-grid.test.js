import React from "react";
import { render } from "@testing-library/react";
import MuiDataGrid from "./mui-data-grid";
import { DataGrid } from "@mui/x-data-grid";

jest.mock("@mui/x-data-grid", () => ({
  DataGrid: jest.fn(() => null)
}));

describe("MuiDataGrid Component", () => {
  const mockColumns = [{ field: "id" }, { field: "name" }];
  const mockRows = [{ name: "John" }, { name: "Jane" }];

  it("renders DataGrid with provided props", () => {
    render(<MuiDataGrid columns={mockColumns} rows={mockRows} />);
    expect(DataGrid).toHaveBeenCalledWith(
      expect.objectContaining({
        rows: [
          { id: 0, name: "John" },
          { id: 1, name: "Jane" }
        ],
        columns: mockColumns
      }),
      {}
    );
  });

  it("applies custom styles correctly", () => {
    const customStyles = { color: "red" };
    render(
      <MuiDataGrid
        columns={mockColumns}
        rows={mockRows}
        cellStyle={customStyles}
      />
    );
    expect(DataGrid).toHaveBeenCalledWith(
      expect.objectContaining({
        sx: expect.objectContaining({
          "& .MuiDataGrid-cell": customStyles
        })
      }),
      {}
    );
  });

  it("processes row updates and handles errors", () => {
    const processRowUpdate = jest.fn();
    const onProcessRowUpdateError = jest.fn();
    render(
      <MuiDataGrid
        columns={mockColumns}
        rows={mockRows}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={onProcessRowUpdateError}
      />
    );
  });
});
