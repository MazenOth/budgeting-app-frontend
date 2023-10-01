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
    const user = {
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    };
    event.preventDefault();
    if (emailRef.current && passwordRef.current) {
      console.log(user);
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
