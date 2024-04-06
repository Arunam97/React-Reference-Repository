import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "../views/Home";
import { FilterDropdownWrapper } from "../components/filter-dropdown/filter-dropdown-wrapper";
import { BreadcrumbsLinksWrapper } from "../components/breadcrumbs-links/breadcrumbs-links-wrapper";

// Define a component for managing routes
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/filter" element={<FilterDropdownWrapper />} />
      <Route path="breadcrumbs" element={<BreadcrumbsLinksWrapper />} />
      <Route path="*" element={<p>404</p>} />
    </Routes>
  );
};

export default AppRoutes;
