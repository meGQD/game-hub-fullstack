import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Alert,
  Badge,
  Button,
  Field,
  FieldRequiredIndicator,
  Input,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import useRegister from "../hooks/useRegister";
import useLogin from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getBackendErrorMessage } from "@/services/error-service";
import { toaster } from "@/components/ui/toaster";

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
  first_name: z
    .string()
    .trim()
    .min(1, { message: "First name is required." })
    .regex(/^[a-zA-z]+([a-zA-z ]+)*$/, {
      message: "Your first name can only contain letters.",
    }),
  last_name: z
    .string()
    .trim()
    .regex(/^[a-zA-z]+([a-zA-z ]+)*$/, {
      message: "Your first name can only contain letters.",
    })
    .optional()
    .or(z.literal("")),
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Please enter a valid email address." }),
});

type UserRegisterData = z.infer<typeof schema>;

const UserRegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegisterData>({ resolver: zodResolver(schema) });

  const registerMutation = useRegister();
  const loginMutation = useLogin();

  const [backendError, setBackendError] = useState<string | null>(null);

  const navigate = useNavigate();

  const onSubmit = (data: UserRegisterData) => {
    setBackendError(null);

    registerMutation.mutate(data, {
      onSuccess: () => {
        toaster.create({
          title: "Registration successfull.",
          type: "success",
          duration: 5000,
          closable: true,
        });
        loginMutation.mutate(
          {
            username: data.username,
            password: data.password,
          },
          {
            onSuccess: () => {
              toaster.create({
                title: "Successfully logged in.",
                type: "success",
                duration: 5000,
                closable: true,
              });
              navigate("/");
            },
          }
        );
      },
      onError: (error) => {
        console.error("Registration failed:", error.message);
        setBackendError(getBackendErrorMessage(error));
      },
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={5}>
          {backendError && (
            <Alert.Root status="error">
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
          <Field.Root required invalid={errors.first_name && true}>
            <Field.Label>
              First name <FieldRequiredIndicator />
            </Field.Label>
            <Input
              {...register("first_name")}
              type="text"
              borderRadius={15}
            ></Input>
            {errors.first_name && (
              <Field.ErrorText>{errors.first_name.message}</Field.ErrorText>
            )}
          </Field.Root>
          <Field.Root invalid={errors.last_name && true}>
            <Field.Label>
              Last name{" "}
              <FieldRequiredIndicator
                fallback={
                  <Badge size="xs" variant="surface">
                    Optional
                  </Badge>
                }
              />
            </Field.Label>
            <Input
              {...register("last_name")}
              type="text"
              borderRadius={15}
            ></Input>
            {errors.last_name && (
              <Field.ErrorText>{errors.last_name.message}</Field.ErrorText>
            )}
          </Field.Root>
          <Field.Root required invalid={errors.email && true}>
            <Field.Label>
              Email <FieldRequiredIndicator />
            </Field.Label>
            <Input {...register("email")} type="text" borderRadius={15}></Input>
            {errors.email && (
              <Field.ErrorText>{errors.email.message}</Field.ErrorText>
            )}
          </Field.Root>
          <Button
            loading={registerMutation.isPending && true}
            colorPalette="green"
            type="submit"
          >
            {registerMutation.isPending ? <Spinner /> : "SignUp"}
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default UserRegistrationForm;
