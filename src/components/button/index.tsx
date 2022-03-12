import React from "react";
import { Button as ButtonBase } from "@chakra-ui/react";

interface Props {
  children: React.ReactNode;
}

const Button: React.FC<Props> = (props: Props) => {
  const { children } = props;
  return <ButtonBase>{children}</ButtonBase>;
};

export default Button;
