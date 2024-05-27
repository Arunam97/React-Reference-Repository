import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import EditCell from "./edit-cell";

describe("EditCell Component", () => {
  it("renders correctly with the provided value", () => {
    const { getByText } = render(<EditCell value="Sample Text" />);
    expect(getByText("Sample Text")).toBeInTheDocument();
  });

  it("hides the edit icon by default and shows on hover", () => {
    const { getByRole } = render(<EditCell value="Sample Text" />);
    const button = getByRole("button");
    fireEvent.mouseOver(button);
    expect(button).toHaveStyle("visibility: visible");
  });
});
