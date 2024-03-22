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
  Text,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Card, CardBody } from "@chakra-ui/react";
import { Toaster, toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useState } from "react";

const Signup = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const navigate = useNavigate();
  const { setAuth, auth } = useAuth();

  const schema = z.object({
    email: z
      .string()
      .min(3, { message: "Email must be at least 3 characters." })
      .email({ message: "Invalid email." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => {
    axios
      .post("http://localhost:4000/signup", data)
      .then((res) => {
        const accessToken = res.data.token;
        const id = res.data.id;
        const userName = res.data.name;
        const email = res.data.email;
        setAuth({
          ...auth,
          accessToken: accessToken,
          id: id,
          userName: userName,
          email: email,
        });
        console.log(res, res.data.token);
        navigate("/add-wallet");
      })
      .catch((err) => {
        err.response.request.status == 400
          ? toast.error("User already registered!")
          : null;
        console.log(err.response.request.status);
      });
  };

  return (
    <>
      <Toaster richColors />
      <VStack>
        <Box boxSize={"60"} mt={3}>
          <Image
            src="https://www.pngfind.com/pngs/b/209-2090735_money-logo-png.png"
            alt="Money Lover Logo"
          />
        </Box>
        <Container maxW={"3xl"}>
          <Card mb={3} borderRadius={"3xl"}>
            <CardBody>
              <Heading
                size="md"
                textAlign={"center"}
                mb={5}
                fontSize={"xx-large"}
              >
                Register
              </Heading>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl mb={5}>
                  <FormLabel>Email</FormLabel>
                  <Input {...register("email")} id="email" type="email" />
                  {errors.email && (
                    <Text color="tomato">{errors.email.message}</Text>
                  )}
                </FormControl>
                <FormControl mb={5}>
                  <FormLabel>Password</FormLabel>
                  <InputGroup size="md">
                    <Input
                      {...register("password")}
                      id="password"
                      type={show ? "text" : "password"}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {errors.password && (
                    <Text color="tomato">{errors.password.message}</Text>
                  )}
                </FormControl>
                <Flex justify={"center"}>
                  <Button
                    colorScheme="whatsapp"
                    type="submit"
                    width="800px"
                    size={"lg"}
                  >
                    REGISTER
                  </Button>
                </Flex>
                <Text fontSize={"large"} mt={"3"} textAlign={"center"}>
                  Have an account?{" "}
                  {
                    <Link to="/login">
                      {
                        <Text as="u" color={"whatsapp.300"}>
                          {" "}
                          Sign In{" "}
                        </Text>
                      }
                    </Link>
                  }
                </Text>
              </form>
            </CardBody>
          </Card>
        </Container>
      </VStack>
    </>
  );
};

export default Signup;
