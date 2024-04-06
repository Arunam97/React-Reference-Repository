import { Box } from "@mui/material";
import { CustomBreadcrumbs } from "./breadcrumbs-links";
import { breadcrumbs } from "./bread-mock";

// create boilerplate for BreadcrumbsLinksWrapper component
export const BreadcrumbsLinksWrapper = () => {
  return (
    <Box>
      <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
    </Box>
  );
};
