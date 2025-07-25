import {
  Alert,
  Box,
  Button,
  Field,
  FieldErrorText,
  HStack,
  Input,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import type { Profile } from "../hooks/useProfile";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useUpdateProfile from "../hooks/useUpdateProfile";
import { useState } from "react";
import { getBackendErrorMessage } from "@/services/error-service";
import LogoutButton from "./LogoutButton";

const schema = z.object({
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
  phone: z
    .string()
    .refine(
      (val) => {
        if (val === "") return true;
        return /^[0]+[9]+([0-9]+)*$/.test(val);
      },
      { message: "Please enter a valid phone number starting with 09." }
    )
    .transform((val) => (val === "" ? null : val))
    .nullable(),
  birth_date: z
    .string()
    .transform((val) => (val === "" ? null : val))
    .nullable(),
});

type ProfileData = z.infer<typeof schema>;

interface Props {
  profile: Profile;
}

const ProfileDetailsForm = ({ profile }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileData>({
    resolver: zodResolver(schema),
    defaultValues: {
      first_name: profile.first_name,
      last_name: profile.last_name || "",
      phone: profile.phone || "",
      birth_date: profile.birth_date || "",
    },
  });

  const updateProfileMutation = useUpdateProfile();

  const [backendError, setBackendError] = useState<string | null>(null);

  const onSubmit = (data: ProfileData) => {
    setBackendError(null);

    updateProfileMutation.mutate(data, {
      onSuccess: () => {
        console.log("Profile updated successfully");
      },
      onError: (error) => {
        console.error("Updating profile failed.", error.message);
        setBackendError(getBackendErrorMessage(error));
      },
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {backendError && (
          <Box marginBottom={5}>
            <Alert.Root status="error">
              <Alert.Indicator />
              <Alert.Content>
                <Alert.Title>Error</Alert.Title>
                <Alert.Description>{backendError}</Alert.Description>
              </Alert.Content>
            </Alert.Root>
          </Box>
        )}
        {updateProfileMutation.isSuccess && (
          <Box marginBottom={5}>
            <Alert.Root status="success">
              <Alert.Indicator />
              <Alert.Content>
                <Alert.Title>Profile updated successfully</Alert.Title>
              </Alert.Content>
            </Alert.Root>
          </Box>
        )}
        <SimpleGrid
          columns={{ sm: 1, md: 2 }}
          columnGap={10}
          rowGap={6}
          justifyContent="space-between"
        >
          <Field.Root
            orientation="horizontal"
            invalid={errors.first_name && true}
          >
            <Field.Label>First Name</Field.Label>
            <Input
              {...register("first_name")}
              type="text"
              borderRadius={15}
            ></Input>
            {errors.first_name && (
              <FieldErrorText>{errors.first_name.message}</FieldErrorText>
            )}
          </Field.Root>
          <Field.Root
            orientation="horizontal"
            invalid={errors.last_name && true}
          >
            <Field.Label>Last Name</Field.Label>
            <Input
              {...register("last_name")}
              type="text"
              borderRadius={15}
            ></Input>
            {errors.last_name && (
              <FieldErrorText>{errors.last_name.message}</FieldErrorText>
            )}
          </Field.Root>
          <Field.Root orientation="horizontal" invalid={errors.phone && true}>
            <Field.Label>Phone Number</Field.Label>
            <Input {...register("phone")} type="text" borderRadius={15}></Input>
            {errors.phone && (
              <FieldErrorText>{errors.phone.message}</FieldErrorText>
            )}
          </Field.Root>
          <Field.Root
            orientation="horizontal"
            invalid={errors.birth_date && true}
          >
            <Field.Label>Birth Date</Field.Label>
            <Input
              {...register("birth_date")}
              type="date"
              borderRadius={15}
            ></Input>
            {errors.birth_date && (
              <FieldErrorText>{errors.birth_date.message}</FieldErrorText>
            )}
          </Field.Root>
          <Field.Root orientation="horizontal" disabled>
            <Field.Label>Email</Field.Label>
            <Input
              placeholder={profile.email}
              defaultValue={profile.email}
              borderRadius={15}
            ></Input>
          </Field.Root>
        </SimpleGrid>
        <HStack marginTop={5} columnGap={4} justifyContent="space-between">
          <HStack>
            <Button
              colorPalette="blue"
              type="submit"
              loading={updateProfileMutation.isPending && true}
            >
              {updateProfileMutation.isPending ? <Spinner /> : "Save"}
            </Button>
            <Button onClick={() => reset()}>Revert</Button>
          </HStack>
          <HStack>
            <LogoutButton />
          </HStack>
        </HStack>
      </form>
    </>
  );
};

export default ProfileDetailsForm;
