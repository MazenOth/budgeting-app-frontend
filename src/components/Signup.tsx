import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
} from "@chakra-ui/react";
import { FieldValues, useForm } from "react-hook-form";

const Signup = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: FieldValues) => {
    console.log("Submiting", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl mb={5}>
        <FormLabel>Email</FormLabel>
        <Input {...register("email")} id="email" type="email" />
        <FormHelperText>We'll never share your email.</FormHelperText>
      </FormControl>

      <FormControl mb={5}>
        <FormLabel>Password</FormLabel>
        <Input {...register("password")} id="password" type="password" />
        <FormHelperText>Your password is encrypted.</FormHelperText>
      </FormControl>

      <Button colorScheme="teal" type="submit">
        Register
      </Button>
    </form>
  );
};

export default Signup;
