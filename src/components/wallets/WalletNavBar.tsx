import { HStack, Text } from "@chakra-ui/react";
import ColorModeSwitch from "../ColorModeSwitch";
import { IconButton } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import React from "react";

const WalletNavBar = () => {
  const navigate = useNavigate();
  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <HStack ml={"3"} justifyContent={"space-between"} mr={"3"}>
      <HStack>
        <IconButton
          aria-label="Search database"
          icon={<ArrowBackIcon />}
          variant={"ghost"}
          onClick={handleClick} 
        />
        <Text>My Wallets</Text>
      </HStack>
      <ColorModeSwitch />
    </HStack>
  );
};

export default WalletNavBar;
