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

const DeleteWallet = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);
  const onDelete = () => {
    axios
      .delete(
        "http://localhost:4000/deleteWallet/" + "65867f012dc774a0ae80810e"
      )
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

  return (
    <>
      <Button colorScheme="red" onClick={onOpen}>
        Delete Wallet
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

export default DeleteWallet;
