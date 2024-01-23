import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  NumberInput,
  NumberInputField,
  Text,
  VStack,
  ButtonGroup,
  HStack,
  Flex,
  Spacer,
  Box,
} from "@chakra-ui/react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Toaster, toast } from "sonner";
import useAuth from "../../hooks/useAuth";
import Signout from "../Signout";
import DeleteAccount from "./DeleteAccount";

const schema = z.object({
  name: z.string().min(2).max(50),
  currency: z.string().min(1),
  balance: z.number(),
});

type FormData = z.infer<typeof schema>;

const MyAccount = () => {
  const { auth } = useAuth();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <>
      <Button
        width={"80"}
        colorScheme="teal"
        variant="ghost"
        borderRadius={"none"}
        onClick={onOpen}
      >
        My Account
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>My Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack>
              <Text fontSize="lg">{auth.userName}</Text>
              <Text fontSize="medium" color="GrayText">
                {auth.email}
              </Text>
            </VStack>
          </ModalBody>

          <Flex padding="4" minWidth="max-content" alignItems="center" gap="2">
            <Box>
              {" "}
              <Signout />
            </Box>
            <Spacer />
            <Box>
              {" "}
              <DeleteAccount />
            </Box>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MyAccount;
