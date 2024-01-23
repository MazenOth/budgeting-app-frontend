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
  IconButton,
} from "@chakra-ui/react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Toaster, toast } from "sonner";
import useAuth from "../../hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddIcon } from "@chakra-ui/icons";
import useWallets from "../../hooks/useWallets";
import useCategories from "../../hooks/useCategories";

const schema = z.object({
  categoryId: z.string().min(1),
  amount: z.number().min(0.001).max(1000000000000),
  transactionDate: z.coerce.date(),
});

type FormData = z.infer<typeof schema>;

const AddTransaction = () => {
  const { data } = useCategories();
  const queryClient = useQueryClient();
  const { auth } = useAuth();
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const addTransaction = useMutation({
    mutationFn: (transaction: FieldValues) =>
      axios
        .post<FieldValues>(
          "http://localhost:4000/addTransaction/" +
            auth.walletId +
            "/" +
            auth.id,
          transaction
        )
        .then((res) => {
          res.data;
          toast.success("Success!");
        })
        .catch((err) => {
          err.response.request.status == 400
            ? toast.error(err.response.data)
            : null;
        }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });
    },
  });

  const onSubmit = (data: FieldValues) => {
    addTransaction.mutate(data);
    console.log(data);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <>
      <Button
        leftIcon={<AddIcon />}
        colorScheme="teal"
        variant="ghost"
        onClick={onOpen}
      >
        Add transaction
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add transaction!</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl mt={4}>
                <FormLabel>Category</FormLabel>
                <Select
                  placeholder="Please select your category"
                  {...register("categoryId")}
                >
                  {data?.map((category) => (
                    <option
                      key={category._id}

                      // onSelect={() => {
                      //   setValue("categoryId", category._id);
                      // }}
                    >
                      {category._id}
                    </option>
                  ))}
                </Select>
                {errors.categoryId && (
                  <Text color="tomato">{errors.categoryId.message}</Text>
                )}
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Amount</FormLabel>
                <NumberInput defaultValue={0}>
                  <NumberInputField
                    {...register("amount", { valueAsNumber: true })}
                  />
                  {errors.amount && (
                    <Text color="tomato">{errors.amount.message}</Text>
                  )}
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel>Date</FormLabel>
                <Input
                  {...register("transactionDate")}
                  placeholder="Select Date"
                  size="md"
                  type="date"
                />
                {errors.transactionDate && (
                  <Text color="tomato">{errors.transactionDate.message}</Text>
                )}
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

export default AddTransaction;
