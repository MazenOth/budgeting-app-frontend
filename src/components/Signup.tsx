import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
} from "@chakra-ui/react";
import { FormEvent, useRef } from "react";

const Signup = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (emailRef.current && passwordRef.current) {
      console.log(emailRef.current.value);
      console.log(passwordRef.current.value);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <FormControl mb={5}>
        <FormLabel>Email</FormLabel>
        <Input ref={emailRef} id="email" type="email" />
        <FormHelperText>We'll never share your email.</FormHelperText>
      </FormControl>
      <FormControl mb={5}>
        <FormLabel>Password</FormLabel>
        <Input ref={passwordRef} id="password" type="password" />
        <FormHelperText>Your password is encrypted.</FormHelperText>
      </FormControl>

      <Button colorScheme="teal" type="submit">
        Register
      </Button>
    </form>
  );
};

export default Signup;
