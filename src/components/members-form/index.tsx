import React, { useCallback, useMemo } from "react";
import { Button, Flex, Box, useToast } from "@chakra-ui/react";

import { sendInvites } from "core/api/fake.api";
import { setLoading } from "core/reducer/main/actions";
import { useAppDispatch, useAppSelector } from "core/reducer";
import MultiSelect from "components/multi-select";

const MembersForm: React.FC = () => {
  const { loading, emails } = useAppSelector((state) => state.main);
  const buttonIsDisabled = useMemo(() => loading || !emails.length, [emails]);
  const dispatch = useAppDispatch();
  const toast = useToast();

  const handleOnClick = useCallback(() => {
    if (loading) {
      return;
    }

    dispatch(setLoading(true));

    sendInvites(emails)
      .then(() => {
        toast({
          title: "Sent!",
          description: "Invites was successfully sent",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: err.message,
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [emails]);

  return (
    <Flex>
      <Box flex="1">
        <MultiSelect />
      </Box>
      <Box pl="4">
        <Button
          bg="primary"
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
