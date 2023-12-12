import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
  Heading,
  Flex,
} from "@chakra-ui/react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { Card, CardBody } from "@chakra-ui/react";
import { Center } from "@chakra-ui/react";

const schema = z.object({
  email: z.string().min(5).email(),
  password: z.string().min(8),
});

type FormData = z.infer<typeof schema>;

const Signup = () => {
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => {
    axios
      .post("http://localhost:4000/signup", data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => setError(err.response.data));
  };

  return (
    <>
      <Flex
        width={"100vw"}
        height={"100vh"}
        alignContent={"normal"}
        justifyContent={"center"}
      >
        <Center>
          <Card maxW="xl" border={"1px"}>
            <CardBody>
              <Heading size="md" textAlign={"center"} mb={5}>
                Register
              </Heading>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl mb={5}>
                  <FormLabel>Email</FormLabel>
                  <Input {...register("email")} id="email" type="email" />
                  {errors.email && <p color="tomato">{errors.email.message}</p>}
                  {error && <p color="tomato">{error}</p>}
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
                <Button isDisabled={!isValid} colorScheme="teal" type="submit">
                  Register
                </Button>
              </form>
            </CardBody>
          </Card>
        </Center>
      </Flex>
    </>
  );
};

export default Signup;
