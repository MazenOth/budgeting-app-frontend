import { HStack, Text } from "@chakra-ui/react";
import { FaWallet } from "react-icons/fa";
import ColorModeSwitch from "./ColorModeSwitch";
import WalletsMenu from "./wallets/WalletsMenu";

const NavBar = () => {
  return (
    <HStack ml={"3"} justifyContent={"space-between"} mr={"3"}>
      <HStack>
        <WalletsMenu />
      </HStack>
      <ColorModeSwitch />
    </HStack>
  );
};

export default NavBar;
