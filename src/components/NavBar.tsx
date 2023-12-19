import { HStack, Text } from "@chakra-ui/react";
import { FaWallet } from "react-icons/fa";

const NavBar = () => {
  return (
    <HStack ml={"3"}>
      <FaWallet size={"30px"} />
      <Text>Choose Wallet</Text>
    </HStack>
  );
};

export default NavBar;
