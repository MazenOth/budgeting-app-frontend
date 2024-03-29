import React from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
  transactionId: string;
}

const DeleteTransaction = ({ transactionId }: Props) => {
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);
  const DeleteTransaction = useMutation({
    mutationFn: () =>
      axios
        .delete("http://localhost:4000/deleteTransaction/" + transactionId)
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
  const onDelete = () => {
    DeleteTransaction.mutate();
    onClose();
  };

  return (
    <>
      <Button colorScheme="red" onClick={onOpen}>
        Delete
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Wallet
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
        <Toaster richColors />
      </AlertDialog>
    </>
  );
};

export default DeleteTransaction;
