import React from "react";

import { Text } from "@chakra-ui/react";

const NewItem: React.FC = (props) => {
  const { children } = props;
  return <Text>New: {children}</Text>;
};

export default NewItem;
