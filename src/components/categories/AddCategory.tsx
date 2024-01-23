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

const schema = z.object({
  name: z.string().min(2).max(50),
  group: z.string().min(1),
  type: z.string().min(1),
});

type FormData = z.infer<typeof schema>;

const AddCategory = () => {
  const queryClient = useQueryClient();
  const { auth } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const addCategory = useMutation({
    mutationFn: (category: FieldValues) =>
      axios
        .post<FieldValues>(
          "http://localhost:4000/addCategory/" + auth.walletId + "/" + auth.id,
          category
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
        queryKey: ["categories"],
      });
    },
  });

  const onSubmit = (data: FieldValues) => {
    addCategory.mutate(data);
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
        Add Category
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Category!</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl mt={4}>
                <FormLabel>Category Name</FormLabel>
                <Input
                  {...register("name")}
                  placeholder="Please insert your category name"
                />
                {errors.name && (
                  <Text color="tomato">{errors.name.message}</Text>
                )}
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Group</FormLabel>
                <Select
                  {...register("group")}
                  placeholder="Please insert your group"
                >
                  <option>Required Expense</option>
                  <option>Up & Comers</option>
                  <option>Fun & Relax</option>
                  <option>Investing & Debt Payments</option>
                  <option>Income</option>
                  <option>Other</option>
                </Select>
                {errors.group && (
                  <Text color="tomato">{errors.group.message}</Text>
                )}
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Type</FormLabel>
                <Select
                  {...register("type")}
                  placeholder="Please insert your type"
                >
                  <option>Income</option>
                  <option>Expense</option>
                </Select>
                {errors.type && (
                  <Text color="tomato">{errors.type.message}</Text>
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

export default AddCategory;
