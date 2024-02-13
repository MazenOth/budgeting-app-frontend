import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  IconButton,
  VStack,
  Divider,
  Text,
} from "@chakra-ui/react";
import React, { MouseEvent, MouseEventHandler } from "react";
import AddWallet from "./wallets/AddWallet";
import MyAccount from "./user/MyAccount";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Signout from "./Signout";

const SideDrawer = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<HTMLButtonElement>(null);

  const handleMyWalletsClick = (event: React.MouseEvent) => {
    event.preventDefault();
    navigate("my-wallets");
  };
  const handleCategoriesClick = (event: React.MouseEvent) => {
    event.preventDefault();
    navigate("category");
  };

  return (
    <>
      <Button
        as={IconButton}
        icon={<HamburgerIcon />}
        ref={btnRef}
        colorScheme="teal"
        onClick={onOpen}
        variant="ghost"
      >
        Open
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <VStack>
              <Text fontSize="lg">{auth.userName}</Text>
              <Text fontSize="medium" color="GrayText">
                {auth.email}
              </Text>
            </VStack>
          </DrawerHeader>

          <DrawerBody>
            <VStack>
              <Divider />
              <MyAccount />
              <Divider />
              <AddWallet />
              <Divider />
              <Button
                width={"80"}
                colorScheme="teal"
                variant="ghost"
                borderRadius={"none"}
                onClick={handleMyWalletsClick}
              >
                My Wallets
              </Button>
              <Divider />
              <Button
                width={"80"}
                colorScheme="teal"
                variant="ghost"
                borderRadius={"none"}
                onClick={handleCategoriesClick}
              >
                Categories
              </Button>
              <Divider />
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
