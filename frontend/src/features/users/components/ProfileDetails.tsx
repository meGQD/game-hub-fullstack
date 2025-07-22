import {
  Button,
  Field,
  FieldErrorText,
  HStack,
  Input,
  SimpleGrid,
} from "@chakra-ui/react";
import type { Profile } from "../hooks/useProfile";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
  phone: z.string().regex(/^[0]+[9]+([0-9]+)*$/, {
    message: "Please enter a valid phone number",
  }),
  birth_date: z.string(),
});

type ProfileData = z.infer<typeof schema>;

interface Props {
  profile: Profile;
}

const ProfileDetails = ({ profile }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: ProfileData) => {
    console.log(data.first_name);
    console.log(data.birth_date);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SimpleGrid
          columns={{ sm: 1, md: 2 }}
          columnGap={10}
          rowGap={6}
          maxW={"2xl"}
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
              defaultValue={profile.first_name}
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
              defaultValue={profile.last_name}
              borderRadius={15}
            ></Input>
            {errors.last_name && (
              <FieldErrorText>{errors.last_name.message}</FieldErrorText>
            )}
          </Field.Root>
          <Field.Root orientation="horizontal" invalid={errors.phone && true}>
            <Field.Label>Phone Number</Field.Label>
            <Input
              {...register("phone")}
              type="text"
              defaultValue={profile.phone}
              borderRadius={15}
            ></Input>
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
              defaultValue={profile.birth_date}
              borderRadius={15}
            ></Input>
            {errors.birth_date && (
              <FieldErrorText>{errors.birth_date.message}</FieldErrorText>
            )}
          </Field.Root>
          <Field.Root orientation="horizontal" disabled>
            <Field.Label>Email</Field.Label>
            <Input placeholder={profile.email} borderRadius={15}></Input>
          </Field.Root>
        </SimpleGrid>
        <HStack marginTop={5} columnGap={4}>
          <Button colorPalette="blue" type="submit">
            Save
          </Button>
          <Button onClick={() => reset()}>Cancel</Button>
        </HStack>
      </form>
    </>
  );
};

export default ProfileDetails;
