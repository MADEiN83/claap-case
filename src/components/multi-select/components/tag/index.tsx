import React, { useMemo } from "react";
import {
  Tag as TagBase,
  TagLabel,
  TagLeftIcon,
  TagCloseButton,
  Avatar,
} from "@chakra-ui/react";
import { EmailIcon } from "@chakra-ui/icons";

interface Props {
  disabled?: boolean;
  label: string;
  onRemove?: () => void;
}

const Tag: React.FC<Props> = (props: Props) => {
  const { label, onRemove } = props;
  const isEmail = useMemo(() => label.includes("@"), [label]);

  return (
    <TagBase
      variant="solid"
      py="1.5"
      bgColor="brand.900"
      borderWidth="1px"
      borderColor="danger"
    >
      {isEmail && <TagLeftIcon boxSize="14px" as={EmailIcon} color="danger" />}
      {!isEmail && (
        <Avatar
          name={label}
          getInitials={(name: string) => name[0]}
          mr="2"
          size="xs"
          w="3.5"
          h="3.5"
          bgColor="danger"
          color="white"
        />
      )}
      <TagLabel color="danger">{label}</TagLabel>
      <TagCloseButton color="danger" onClick={onRemove} />
    </TagBase>
  );
};

export default Tag;
