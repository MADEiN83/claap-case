import React from "react";
import { Input, Button, Flex, Spacer, Box } from "@chakra-ui/react";

interface Props {}

const MembersForm: React.FC<Props> = (props: Props) => {
  return (
    <Flex>
      <Box flex="1">
        <Input
          bg="brand.900"
          borderColor="brand.700"
          placeholder="Search names or emails..."
        />
      </Box>
      <Box pl="4">
        <Button
          bg="primary"
          color="white"
          px="22.5"
          py="2.5"
          borderRadius="10"
          fontSize="13px"
          onClick={() => {}}
        >
          Invite
        </Button>
      </Box>
    </Flex>
  );
};

export default MembersForm;