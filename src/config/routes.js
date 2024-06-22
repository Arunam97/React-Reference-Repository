import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "../views/Home";
import { FilterDropdownWrapper } from "../components/filter-dropdown/filter-dropdown-wrapper";
import { BreadcrumbsLinksWrapper } from "../components/breadcrumbs-links/breadcrumbs-links-wrapper";
import { DatePickerWrapper } from "../components/date-picker/date-picker-wrapper";
import MuiTableWrapper from "../components/mui-table/mui-table-wrapper";
import FileUploadWrapper from "../components/file-upload/file-upload-wrapper";
import PieChartWrapper from "../components/pie-chart/pie-chart-wrapper";
import ClusteredBarChartWrapper from "../components/clustered-bar-chart/clustered-bar-chart-wrapper";

// Define a component for managing routes
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="filter" element={<FilterDropdownWrapper />} />
      <Route path="breadcrumbs" element={<BreadcrumbsLinksWrapper />} />
      <Route path="date-picker" element={<DatePickerWrapper />} />
      <Route path="mui-table" element={<MuiTableWrapper />} />
      <Route path="file-upload" element={<FileUploadWrapper />} />
      <Route path="pie-chart" element={<PieChartWrapper />} />
      <Route
        path="clustered-bar-chart"
        element={<ClusteredBarChartWrapper />}
      />
      <Route path="*" element={<p>404</p>} />
    </Routes>
  );
};

export default AppRoutes;
