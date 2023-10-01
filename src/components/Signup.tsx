import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
} from "@chakra-ui/react";
import { FormEvent } from "react";

const Signup = () => {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log("Registered");
  };
  return (
    <form onSubmit={handleSubmit}>
      <FormControl mb={5}>
        <FormLabel>Email</FormLabel>
        <Input id="email" type="email" />
        <FormHelperText>We'll never share your email.</FormHelperText>
      </FormControl>
      <FormControl mb={5}>
        <FormLabel>Password</FormLabel>
        <Input id="password" type="password" />
        <FormHelperText>Your password is encrypted.</FormHelperText>
      </FormControl>

      <Button colorScheme="teal" type="submit">
        Register
      </Button>
    </form>
  );
};

export default Signup;
