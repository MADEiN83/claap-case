import React, { useCallback, useMemo } from "react";
import { Button, Flex, Box, useToast } from "@chakra-ui/react";

import { sendInvites } from "core/api/fake.api";
import { setEmails, setLoading } from "core/reducer/main/actions";
import { useAppDispatch, useAppSelector } from "core/reducer";
import MultiSelect from "components/multi-select";

interface Props {
  onInvitesSent: () => void;
}

const MembersForm: React.FC<Props> = (props: Props) => {
  const { onInvitesSent } = props;
  const { loading, emails } = useAppSelector((state) => state.main);
  const buttonIsDisabled = useMemo(() => loading || !emails.length, [emails]);
  const dispatch = useAppDispatch();
  const toast = useToast();

  const displayUserFeedback = useCallback((args) => {
    toast({
      ...args,
      duration: 2000,
      isClosable: true,
    });
  }, []);

  const handleOnClick = useCallback(() => {
    if (loading) {
      return;
    }

    dispatch(setLoading(true));

    sendInvites(emails)
      .then(() => {
        displayUserFeedback({
          title: "Sent!",
          description: `Invites was successfully sent to: ${emails.join(", ")}`,
          status: "success",
        });
        onInvitesSent();
        dispatch(setEmails([]));
      })
      .catch((err) => {
        displayUserFeedback({
          title: "Error",
          description: err.message,
          status: "error",
        });
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [emails, displayUserFeedback]);

  return (
    <Flex>
      <Box flex="1">
        <MultiSelect />
      </Box>
      <Box pl="4">
        <Button
          bg="primary"
          _hover={{ bg: "primaryHover" }}
          color="white"
          px="22.5"
          py="2.5"
          borderRadius="10"
          fontSize="13px"
          onClick={handleOnClick}
          disabled={buttonIsDisabled}
          isLoading={loading}
        >
          Invite
        </Button>
      </Box>
    </Flex>
  );
};

export default MembersForm;
