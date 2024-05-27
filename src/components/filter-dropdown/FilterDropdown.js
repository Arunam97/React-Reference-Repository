import React, { useState } from "react";
import {
  FormControl,
  Button,
  Box,
  Chip,
  Autocomplete,
  TextField
} from "@mui/material";

function FilterDropdown({ filters, onApply, hide = [] }) {
  const [selectedValues, setSelectedValues] = useState(() =>
    Object.keys(filters).reduce((acc, key) => ({ ...acc, [key]: [] }), {})
  );

  const handleChange = (filterKey, newValue) => {
    setSelectedValues((prev) => ({ ...prev, [filterKey]: newValue }));
  };

  const handleReset = () => {
    const resetState = Object.keys(filters).reduce(
      (acc, key) => ({ ...acc, [key]: [] }),
      {}
    );
    setSelectedValues(resetState);
    onApply(resetState);
  };

  const handleApply = () => {
    onApply(selectedValues);
  };

  const getFilteredOptions = (filterKey) => {
    // Proceed only if the current filter key is an array and should not be ignored
    if (!Array.isArray(filters[filterKey])) {
      console.error(
        `Expected an array at 'filters[${filterKey}]', but got:`,
        filters[filterKey]
      );
      return []; // Return an empty array to prevent runtime errors
    }

    return filters[filterKey]
      .filter((option) => {
        // Filter options based only on the selected values of visible filters
        return Object.entries(selectedValues).every(([key, selectedArray]) => {
          // If the filter key is the current one, or there are no selected values, or the filter is hidden, return true
          if (
            key === filterKey ||
            selectedArray.length === 0 ||
            hide.includes(key)
          ) {
            return true;
          }

          // Ensure that every selected value has a corresponding option in other filters
          return selectedArray.every((val) =>
            filters[key].some(
              (otherOption) =>
                otherOption.id === val &&
                otherOption[filterKey]?.includes(option.id)
            )
          );
        });
      })
      .sort((a, b) => {
        const aValue = (a.value || "").toLowerCase();
        const bValue = (b.value || "").toLowerCase();
        return aValue.localeCompare(bValue);
      });
  };

  const isAnySelected = Object.values(selectedValues).some(
    (selectedArray) => selectedArray.length > 0
  );

  if (hide.length === Object.keys(filters).length) {
    return null; // Hides the entire component if all filters are in the hide array
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {Object.keys(filters).map((filterKey) =>
        hide.includes(filterKey) ? null : ( // Conditional rendering based on hide array
          <FormControl key={filterKey} sx={{ m: 1, width: 300 }}>
            <Autocomplete
              multiple
              id={`${filterKey}-autocomplete`}
              options={getFilteredOptions(filterKey).map((option) => option.id)}
              getOptionLabel={(optionId) =>
                filters[filterKey].find((option) => option.id === optionId)
                  ?.value || optionId
              }
              value={selectedValues[filterKey]}
              onChange={(event, newValue) => handleChange(filterKey, newValue)}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    label={
                      filters[filterKey].find((opt) => opt.id === option)
                        ?.value || option
                    }
                    {...getTagProps({ index })}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={`Select ${filterKey}`}
                  placeholder={filterKey}
                />
              )}
              sx={{ width: "15rem" }} // Adjust width as needed
            />
          </FormControl>
        )
      )}
      <Box sx={{ display: "flex", gap: 1 }}>
        <Button onClick={handleReset} variant="outlined">
          Reset
        </Button>
        <Button
          onClick={handleApply}
          variant="contained"
          disabled={!isAnySelected}
        >
          Apply
        </Button>
      </Box>
    </Box>
  );
}

export default FilterDropdown;
