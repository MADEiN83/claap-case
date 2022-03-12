import React, { useEffect } from "react";
import { Box } from "@chakra-ui/react";

// eslint-disable-next-line react/display-name
const withLayout = (WrappedComponent: React.FC) => () => {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <Box bg="brand.900">
      <WrappedComponent />;
    </Box>
  );
};

export default withLayout;
