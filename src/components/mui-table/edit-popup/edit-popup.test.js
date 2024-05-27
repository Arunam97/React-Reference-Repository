import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import EditPopup from "./edit-popup";
import { useGridApiContext } from "@mui/x-data-grid";

// Mock the useGridApiContext
jest.mock("@mui/x-data-grid", () => ({
  useGridApiContext: jest.fn()
}));

describe("EditPopup Component", () => {
  beforeEach(() => {
    useGridApiContext.mockReturnValue({
      current: {
        getRowsCount: jest.fn().mockReturnValue(3),
        getAllRowIds: jest.fn().mockReturnValue(["1", "2", "3"]),
        getCellElement: jest.fn().mockReturnValue({
          getBoundingClientRect: () => ({
            top: 100
          })
        }),
        stopCellEditMode: jest.fn(),
        setEditCellValue: jest.fn(),
        rootElementRef: {
          current: {
            getBoundingClientRect: () => ({
              top: 50
            })
          }
        }
      }
    });
  });

  it("renders with initial state correctly", () => {
    const { getByDisplayValue } = render(
      <EditPopup id="1" field="name" value="Initial Value" />
    );
    expect(getByDisplayValue("Initial Value")).toBeInTheDocument();
  });

  it("handles input changes", async () => {
    const { getByDisplayValue } = render(
      <EditPopup id="1" field="name" value="Initial Value" />
    );
    const input = getByDisplayValue("Initial Value");
    fireEvent.change(input, { target: { value: "Updated Value" } });
    await waitFor(() => {
      expect(input.value).toBe("Updated Value");
    });
  });

  it("triggers save and cancel operations", () => {
    const { getByText } = render(
      <EditPopup id="1" field="name" value="Initial Value" />
    );
    const saveButton = getByText("Save");
    const cancelButton = getByText("Cancel");

    fireEvent.click(saveButton);
    expect(useGridApiContext().current.setEditCellValue).toHaveBeenCalledWith(
      { id: "1", field: "name", value: "Initial Value" },
      null,
      true
    );

    fireEvent.click(cancelButton);
    expect(useGridApiContext().current.stopCellEditMode).toHaveBeenCalledWith({
      id: "1",
      field: "name",
      ignoreModifications: true
    });
  });
});
