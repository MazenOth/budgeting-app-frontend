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
} from "@chakra-ui/react";
import React from "react";

const SideDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<HTMLButtonElement>(null);

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
              <Button
                width={"80"}
                colorScheme="teal"
                variant="ghost"
                borderRadius={"none"}
              >
                My Wallets
              </Button>
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
