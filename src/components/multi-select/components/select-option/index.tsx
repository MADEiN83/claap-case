import React from "react";
import { Avatar, Flex, Text } from "@chakra-ui/react";

import { User } from "core/api/fake.api";

interface Props {
  user: User;
}

const SelectOption: React.FC<Props> = (props: Props) => {
  const { user } = props;

  return (
    <Flex alignItems="center">
      <Avatar size="sm" name={user.firstName} bgColor="primary" color="white" />
      <Text ml="4" color="white">
        {user.firstName} {user.lastName}
      </Text>
    </Flex>
  );
};

export default SelectOption;
