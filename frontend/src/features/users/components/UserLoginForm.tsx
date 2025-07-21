import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  Button,
  Field,
  FieldRequiredIndicator,
  Input,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import useLogin from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getBackendErrorMessage } from "@/services/error-service";

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
  } = useForm<UserLoginData>({ resolver: zodResolver(schema) });

  const loginMutation = useLogin();

  const [backendError, setBackendError] = useState<string | null>(null);

  const navigate = useNavigate();

  const onSubmit = (data: UserLoginData) => {
    setBackendError(null);

    loginMutation.mutate(data, {
      onSuccess: () => {
        navigate("/");
      },
      onError: (error) => {
        console.error("Login Failed", error.message);
        setBackendError(getBackendErrorMessage(error));
      },
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={5}>
          {backendError && (
            <Alert.Root status="error" borderRadius="md">
              <Alert.Indicator />
              <Alert.Content>
                <Alert.Title>Error</Alert.Title>
                <Alert.Description>{backendError}</Alert.Description>
              </Alert.Content>
            </Alert.Root>
          )}
          <Field.Root required invalid={errors.username && true}>
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
          <Field.Root required invalid={errors.password && true}>
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

          <Button
            loading={loginMutation.isPending && true}
            colorPalette="cyan"
            type="submit"
          >
            {loginMutation.isPending ? <Spinner /> : "Login"}
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default UserLoginForm;
