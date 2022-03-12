import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Center,
  Text,
} from "@chakra-ui/react";

import { MembersForm } from "components";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const InviteModal: React.FC<Props> = (props: Props) => {
  const { isOpen, onClose } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent bg="brand.800" p={16} borderRadius="10">
        <ModalHeader textColor="grey.700" fontSize="2xl">
          <Center>Invite members</Center>
        </ModalHeader>
        <ModalBody>
          <Text textColor="grey.700" fontSize="15px">
            Email invite
          </Text>
          <Text textColor="grey.base" fontSize="15px" mt="4" mb="6">
            Send members an email invitation to join this workspace
          </Text>

          <MembersForm onInvitesSent={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default InviteModal;
