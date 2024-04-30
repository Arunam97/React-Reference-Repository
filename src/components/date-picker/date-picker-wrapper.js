import React, { useState } from "react";
import { CustomDatePicker } from "./date-picker";

import dayjs from "dayjs";

export const DatePickerWrapper = () => {
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  const handleSubmit = (start, end) => {
    setStart(start);
    setEnd(end);
  };

  return (
    <div>
      <CustomDatePicker
        startDate="2024-01-01"
        endDate="2024-01-31"
        handleSubmit={handleSubmit}
      />
      <p>{dayjs(start).format("YYYY-MM-DD")}</p>
      <p>{dayjs(end).format("YYYY-MM-DD")}</p>
    </div>
  );
};
