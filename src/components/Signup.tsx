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
import { Link } from "react-router-dom";

const Signup = () => {
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
      .post("http://localhost:4000/signup", data)
      .then((res) => {
        toast.success("Success!");
        console.log(res);
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
          <Card mb={3} bg={"aliceblue"} borderRadius={"3xl"}>
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
                  Have you an account?{" "}
                  {
                    <Link to="/">
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
