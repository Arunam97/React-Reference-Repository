import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { CustomDatePicker } from "./date-picker";
import { DatepickerMock } from "./date-picker-mock";
import { addDateFilter } from "../../config/util";
import { BuyerFiltersAtom } from "../filter-dropdown/BuyerFiltersAtom";
import dayjs from "dayjs";

export const DatePickerWrapper = () => {
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  const [buyerFilters, setBuyerFilters] = useRecoilState(BuyerFiltersAtom);

  const handleSubmit = (start, end) => {
    setStart(start);
    setEnd(end);
    const updatedFilters = addDateFilter(
      buyerFilters,
      dayjs(start).format("YYYY-MM-DD"),
      dayjs(end).format("YYYY-MM-DD")
    );
    setBuyerFilters(updatedFilters);
  };

  return (
    <div>
      <CustomDatePicker
        startDate={DatepickerMock.rowData[0].MIN_DATE}
        endDate={DatepickerMock.rowData[0].MAX_DATE}
        handleSubmit={handleSubmit}
      />
      <p>{dayjs(start).format("YYYY-MM-DD")}</p>
      <p>{dayjs(end).format("YYYY-MM-DD")}</p>
    </div>
  );
};
