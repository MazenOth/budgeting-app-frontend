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
} from "@chakra-ui/react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Toaster, toast } from "sonner";
import useAuth from "../../hooks/useAuth";

const schema = z.object({
  name: z.string().min(2).max(50),
  currency: z.string().min(1),
  balance: z.number(),
});

type FormData = z.infer<typeof schema>;

const AddWallet = () => {
  const { auth } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => {
    axios
      .post("http://localhost:4000/addWallet/" + auth.id, data)
      .then((res) => {
        toast.success("Success!");
        console.log(res);
      })
      .catch((err) => {
        err.response.request.status == 400
          ? toast.error(err.response.data)
          : null;
        console.log(err.response.data);
      });
  };

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
        Add Wallet
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a wallet first!</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl mt={4}>
                <FormLabel>Wallet Name</FormLabel>
                <Input
                  {...register("name")}
                  placeholder="Please insert your wallet name"
                />
                {errors.name && (
                  <Text color="tomato">{errors.name.message}</Text>
                )}
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Currency</FormLabel>
                <Select
                  {...register("currency")}
                  placeholder="Please insert your currency"
                >
                  <option>EGP</option>
                  <option>USD</option>
                </Select>
                {errors.currency && (
                  <Text color="tomato">{errors.currency.message}</Text>
                )}
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Initial Balance</FormLabel>
                <NumberInput defaultValue={0}>
                  <NumberInputField
                    {...register("balance", { valueAsNumber: true })}
                  />
                  {errors.balance && (
                    <Text color="tomato">{errors.balance.message}</Text>
                  )}
                </NumberInput>
              </FormControl>
              <Button colorScheme="blue" mr={3} type="submit" mt={3}>
                Save
              </Button>
              <Button mr={3} mt={3} onClick={onClose}>
                Cancel
              </Button>
              <Toaster richColors />
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddWallet;
