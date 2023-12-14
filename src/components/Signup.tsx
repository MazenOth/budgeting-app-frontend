import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
  Heading,
  Flex,
  Container,
  Image,
  Box,
  VStack,
} from "@chakra-ui/react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardBody } from "@chakra-ui/react";
import { Center } from "@chakra-ui/react";

interface User {
  email: string;
  password: string;
}

const Signup = () => {
  const [users, setUsers] = useState<User[]>([]);

  const emails = users.map((user) => user.email);

  const schema = z.object({
    email: z
      .string()
      .min(5)
      .email()
      .refine((data) => !emails.includes(data), {
        message: "User already registered",
      }),
    password: z.string().min(8),
  });

  type FormData = z.infer<typeof schema>;

  useEffect(() => {
    axios.get("http://localhost:4000/users").then((res) => {
      setUsers(res.data);
      console.log(res.data);
    });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => {
    axios.post("http://localhost:4000/signup", data).then((res) => {
      console.log(res);
    });
  };

  return (
    <>
      <VStack>
        <Box boxSize={"60"}>
          <Image
            src="https://www.pngfind.com/pngs/b/209-2090735_money-logo-png.png"
            alt="Money Lover Logo"
          />
        </Box>
        <Container maxW={"3xl"}>
          <Card border={"1px"}>
            <CardBody>
              <Heading size="md" textAlign={"center"} mb={5} fontSize={"xx-large"}>
                Register
              </Heading>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl mb={5}>
                  <FormLabel>Email</FormLabel>
                  <Input {...register("email")} id="email" type="email" />
                  {errors.email && <p color="tomato">{errors.email.message}</p>}
                  <FormHelperText>We'll never share your email.</FormHelperText>
                </FormControl>
                <FormControl mb={5}>
                  <FormLabel>Password</FormLabel>
                  <Input
                    {...register("password")}
                    id="password"
                    type="password"
                  />
                  {errors.password && (
                    <p color="tomato">{errors.password.message}</p>
                  )}
                  <FormHelperText>Your password is encrypted.</FormHelperText>
                </FormControl>
                <Flex justify={"center"}>
                  <Button colorScheme="whatsapp" type="submit" width='800px' size={"lg"}>
                    Register
                  </Button>
                </Flex>
              </form>
            </CardBody>
          </Card>
        </Container>
      </VStack>
    </>
  );
};

export default Signup;
