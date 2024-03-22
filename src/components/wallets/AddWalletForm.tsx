import React from "react";
import {
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  NumberInput,
  NumberInputField,
  Text,
  CardBody,
  Card,
  Heading,
  Container,
} from "@chakra-ui/react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Toaster, toast } from "sonner";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  name: z.string().min(2).max(50),
  currency: z.string().min(1),
  balance: z.number(),
});

type FormData = z.infer<typeof schema>;

const AddWalletForm = () => {
  const { auth } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const navigate = useNavigate();

  const onSubmit = (data: FieldValues) => {
    axios
      .post("http://localhost:4000/addWallet/" + auth.id, data)
      .then((res) => {
        navigate("/");
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
      <Container maxW={"3xl"}>
        <Card mb={3} mt={150} borderRadius={"3xl"}>
          <CardBody>
            <Heading
              size="md"
              textAlign={"center"}
              mb={5}
              fontSize={"xx-large"}
            >
              Add Wallet First!
            </Heading>
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
              <Button
                mt={5}
                colorScheme="whatsapp"
                type="submit"
                width="700px"
                size={"lg"}
              >
                SAVE MY WALLET
              </Button>
              <Toaster richColors />
            </form>
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default AddWalletForm;
