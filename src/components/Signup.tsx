import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
} from "@chakra-ui/react";

const Signup = () => {
  return (
    <form>
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
        Signup
      </Button>
    </form>
  );
};

export default Signup;
