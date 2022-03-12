import React from "react";
import { useDisclosure } from "@chakra-ui/hooks";
import { Center } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";

import { withLayout } from "HOC";
import { InviteModal } from "components";

const Home: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Center h="100vh">
        <Button colorScheme="blue" onClick={onOpen}>
          Invite teammates
        </Button>
      </Center>
      <InviteModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default withLayout(Home);
