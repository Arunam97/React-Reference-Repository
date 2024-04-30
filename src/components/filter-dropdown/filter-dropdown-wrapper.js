import React from "react";
import { useRecoilState } from "recoil";
import { Box } from "@mui/material";
import { filter_dropdown_mock } from "./mock";
import FilterDropdown from "./FilterDropdown";
import { BuyerFiltersAtom } from "./BuyerFiltersAtom";

import {
  transformUIToFilters,
  createFiltersWithBuyerUserId
} from "../../config/util";

export const FilterDropdownWrapper = () => {
  const [buyerFilters, setBuyerFilters] = useRecoilState(BuyerFiltersAtom);

  // Step 1
  const handleApply = (dropdownData) => {
    const uiToFiltersMappings = {
      Vendor: "VNDR_NAME",
      "Department and Fineline": "DEPT_FINELINE"
    };

    const transformedUitoFilters = transformUIToFilters(
      dropdownData,
      uiToFiltersMappings
    );

    // Step 2
    const newRecoilFilters = createFiltersWithBuyerUserId(
      transformedUitoFilters,
      buyerFilters
    );
    setBuyerFilters(newRecoilFilters);
  };

  function removeFilterField(jsonArray, keyToRemove) {
    // Filter out the object that contains the key to remove
    const updatedArray = jsonArray.filter(
      (item) => !item.hasOwnProperty(keyToRemove)
    );
    return updatedArray;
  }

  // Use preselectedValues as a dependency to change the key when they change
  return (
    <Box>
      <FilterDropdown filters={filter_dropdown_mock} onApply={handleApply} />
      <pre>{JSON.stringify(buyerFilters, null, 2)}</pre>
      <pre>
        {JSON.stringify(
          removeFilterField(buyerFilters, "DEPT_FINELINE"),
          null,
          2
        )}
      </pre>
    </Box>
  );
};
