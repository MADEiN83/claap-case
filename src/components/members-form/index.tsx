import React, { useCallback, useMemo } from "react";
import { Button, Flex, Box } from "@chakra-ui/react";

import { useAppDispatch, useAppSelector } from "core/reducer";
import MultiSelect from "components/multi-select";
import { setLoading } from "core/reducer/main/actions";

const MembersForm: React.FC = () => {
  const { loading, emails } = useAppSelector((state) => state.main);
  const buttonIsDisabled = useMemo(() => loading || !emails.length, [emails]);
  const dispatch = useAppDispatch();

  const sendInvites = useCallback(() => {
    if (loading) {
      return;
    }

    console.log("là", emails);
    dispatch(setLoading(true));
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
          onClick={sendInvites}
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
