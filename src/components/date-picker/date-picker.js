import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export const CustomDatePicker = ({ startDate, endDate, handleSubmit }) => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const handleStartDateChange = (newStartDate) => {
    setSelectedStartDate(newStartDate);
    if (
      newStartDate &&
      selectedEndDate &&
      newStartDate.isAfter(selectedEndDate)
    ) {
      setSelectedEndDate(null); // Reset end date if the start date is after the end date
    }
  };

  const handleEndDateChange = (newEndDate) => {
    setSelectedEndDate(newEndDate);
  };

  const handleReset = () => {
    setSelectedStartDate(null);
    setSelectedEndDate(null);
    handleSubmit(null, null); // Pass null values on reset
  };

  const isSubmitEnabled =
    selectedStartDate &&
    selectedEndDate &&
    selectedStartDate.isValid() &&
    selectedEndDate.isValid() &&
    selectedEndDate.isAfter(selectedStartDate) &&
    selectedStartDate.isAfter(dayjs(startDate) - 1) &&
    selectedEndDate.isBefore(dayjs(endDate) + 1);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <DatePicker
          label="Start Date"
          value={selectedStartDate}
          onChange={handleStartDateChange}
          renderInput={(params) => <TextField {...params} />}
          minDate={dayjs(startDate)}
          maxDate={dayjs(endDate)}
        />
        <DatePicker
          label="End Date"
          value={selectedEndDate}
          onChange={handleEndDateChange}
          renderInput={(params) => <TextField {...params} />}
          minDate={selectedStartDate || dayjs(startDate)}
          maxDate={dayjs(endDate)}
        />
        <Button
          variant="contained"
          onClick={() =>
            handleSubmit(selectedStartDate?.toDate(), selectedEndDate?.toDate())
          }
          disabled={!isSubmitEnabled}
          style={{ margin: "8px" }}
        >
          Submit Dates
        </Button>
        <Button
          variant="outlined"
          onClick={handleReset}
          style={{ margin: "8px" }}
        >
          Reset
        </Button>
      </div>
    </LocalizationProvider>
  );
};
