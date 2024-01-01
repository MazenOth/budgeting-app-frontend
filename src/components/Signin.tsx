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
} from "@chakra-ui/react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Card, CardBody } from "@chakra-ui/react";
import { Toaster, toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Signin = () => {
  const navigate = useNavigate();
  const { setAuth, auth } = useAuth();
  const schema = z.object({
    email: z.string().min(5).email(),
    password: z.string().min(8),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => {
    axios
      .post("http://localhost:4000/signin", data)
      .then((res) => {
        const accessToken = res.data.token;
        const id = res.data.id;
        setAuth({ ...auth, accessToken: accessToken, id: id });
        toast.success("Success!");
        console.log(res, res.data.token);
        navigate("/");
      })
      .catch((err) => {
        err.response.request.status == 400
          ? toast.error("Please check your email or password!")
          : null;
        console.log(err.response.request.status);
      });
  };

  return (
    <>
      <Toaster richColors position="bottom-right" />
      <VStack>
        <Box boxSize={"60"} mt={3}>
          <Image
            src="https://www.pngfind.com/pngs/b/209-2090735_money-logo-png.png"
            alt="Money Lover Logo"
          />
        </Box>
        <Container maxW={"3xl"}>
          <Card mb={3} bg={"aliceblue"} borderRadius={"3xl"}>
            <CardBody>
              <Heading
                size="md"
                textAlign={"center"}
                mb={5}
                fontSize={"xx-large"}
              >
                Log In
              </Heading>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl mb={5}>
                  <FormLabel>Email</FormLabel>
                  <Input {...register("email")} id="email" type="email" />
                  {errors.email && <p color="tomato">{errors.email.message}</p>}
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
                </FormControl>
                <Flex justify={"center"}>
                  <Button
                    colorScheme="whatsapp"
                    type="submit"
                    width="800px"
                    size={"lg"}
                  >
                    LOGIN
                  </Button>
                </Flex>

                <Text fontSize={"large"} mt={"3"} textAlign={"center"}>
                  Don't have an account?{" "}
                  {
                    <Link to="/register">
                      {
                        <Text as="u" color={"whatsapp.300"}>
                          {" "}
                          Register{" "}
                        </Text>
                      }
                    </Link>
                  }
                  {
                    <Link to="/">
                      {
                        <Text as="u" color={"whatsapp.300"}>
                          {" "}
                          Home{" "}
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

export default Signin;
