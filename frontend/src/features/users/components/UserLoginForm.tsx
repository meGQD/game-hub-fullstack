import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Field,
  FieldRequiredIndicator,
  Input,
  Stack,
} from "@chakra-ui/react";

const schema = z.object({
  username: z
    .string()
    .min(1, { message: "This field may not be blank." })
    .max(150, { message: "Your username is exceeds 150 characters." })
    .regex(/^[a-zA-Z][a-zA-Z0-9@.+_-]*$/, {
      message:
        "Username must start with a letter and may contain only letters, numbers, and @/./+/-/_ characters.",
    }),
  password: z
    .string()
    .min(8, {
      message:
        "This password is too short. It must contain at least 8 characters.",
    })
    .regex(/[a-zA-z]/, {
      message: "The password must contain at least 1 letter.",
    }),
});

type UserLoginData = z.infer<typeof schema>;

const UserLoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserLoginData>({ resolver: zodResolver(schema) });
  return (
    <div>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <Stack gap={5}>
          <Field.Root required invalid>
            <Field.Label>
              Username <FieldRequiredIndicator />
            </Field.Label>
            <Input
              {...register("username")}
              type="text"
              borderRadius={15}
            ></Input>
            {errors.username && (
              <Field.ErrorText>{errors.username.message}</Field.ErrorText>
            )}
          </Field.Root>
          <Field.Root required invalid>
            <Field.Label>
              Password <FieldRequiredIndicator />
            </Field.Label>
            <Input
              {...register("password")}
              type="text"
              borderRadius={15}
            ></Input>
            {errors.password && (
              <Field.ErrorText>{errors.password.message}</Field.ErrorText>
            )}
          </Field.Root>
          <Button type="submit">Login</Button>
        </Stack>
      </form>
    </div>
  );
};

export default UserLoginForm;
