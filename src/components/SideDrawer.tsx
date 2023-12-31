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
import AddWallet from "./AddWallet";
import EditWallet from "./EditWallet";
import DeleteWallet from "./DeleteWallet";
import MyWallets from "./MyWallets";
import { Link } from "react-router-dom";

const SideDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<HTMLButtonElement>(null);
  const handleClick = (Event: MouseEvent<HTMLButtonElement>) => {
    <AddWallet></AddWallet>;
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
          <DrawerHeader>User: Email and Name</DrawerHeader>

          <DrawerBody>
            <VStack>
              <Divider />
              <AddWallet />
              <Divider />
              <DeleteWallet />
              <Divider />
              {
                <Link to="/my-wallets">
                  {
                    <Text as="u" color={"whatsapp.300"}>
                      {" "}
                      My Wallets{" "}
                    </Text>
                  }
                </Link>
              }
              <Divider />
            </VStack>
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
