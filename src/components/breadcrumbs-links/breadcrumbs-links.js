import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export const CustomBreadcrumbs = ({
  breadcrumbs,
  separator = <NavigateNextIcon fontSize="small" />,
  ariaLabel = "breadcrumb"
}) => {
  return (
    <Breadcrumbs separator={separator} aria-label={ariaLabel}>
      {breadcrumbs.map((crumb, index) => (
        <Link
          key={index}
          color="inherit"
          href={crumb.link}
          {...(index === breadcrumbs.length - 1
            ? { "aria-current": "page" }
            : {})}
        >
          {crumb.title}
        </Link>
      ))}
    </Breadcrumbs>
  );
};
