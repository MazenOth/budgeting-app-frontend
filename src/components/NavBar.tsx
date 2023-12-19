import { HStack, Text } from "@chakra-ui/react";
import { FaWallet } from "react-icons/fa";
import ColorModeSwitch from "./ColorModeSwitch";

const NavBar = () => {
  return (
    <HStack ml={"3"} justifyContent={"space-between"} mr={"3"}>
      <HStack>
        <FaWallet size={"30px"} />
        <Text>Choose Wallet</Text>
      </HStack>
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
