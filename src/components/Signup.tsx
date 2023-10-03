import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
} from "@chakra-ui/react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().min(5).email(),
  password: z.string().min(8),
});

type FormData = z.infer<typeof schema>;

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => {
    console.log("Submiting", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl mb={5}>
        <FormLabel>Email</FormLabel>
        <Input {...register("email")} id="email" type="email" />
        {errors.email && <p color="tomato">{errors.email.message}</p>}
        <FormHelperText>We'll never share your email.</FormHelperText>
      </FormControl>

      <FormControl mb={5}>
        <FormLabel>Password</FormLabel>
        <Input {...register("password")} id="password" type="password" />
        {errors.password && <p color="tomato">{errors.password.message}</p>}
        <FormHelperText>Your password is encrypted.</FormHelperText>
      </FormControl>

      <Button isDisabled={!isValid} colorScheme="teal" type="submit">
        Register
      </Button>
    </form>
  );
};

export default Signup;
