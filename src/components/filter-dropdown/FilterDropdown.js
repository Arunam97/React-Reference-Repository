import React, { useState } from "react";
import {
  FormControl,
  Button,
  Box,
  Chip,
  Autocomplete,
  TextField
} from "@mui/material";

function FilterDropdown({ filters, onApply }) {
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
    return filters[filterKey]
      .filter((option) => {
        return Object.entries(selectedValues).every(([key, selectedArray]) => {
          if (key === filterKey || selectedArray.length === 0) return true;

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

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {Object.keys(filters).map((filterKey) => (
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
      ))}
      <Box sx={{ display: "flex", gap: 1 }}>
        <Button onClick={handleReset} variant="outlined">
          Reset
        </Button>
        <Button onClick={handleApply} variant="contained">
          Apply
        </Button>
      </Box>
    </Box>
  );
}

export default FilterDropdown;
