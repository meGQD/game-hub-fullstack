import { Text } from "@chakra-ui/react";
import type { Profile } from "../hooks/useProfile";

interface Props {
  profile: Profile;
}

const ProfileDetails = ({ profile }: Props) => {
  return (
    <div>
      <Text>{profile.first_name}</Text>
      <Text>{profile.last_name}</Text>
      <Text>{profile.email}</Text>
      <Text>{profile.birth_date}</Text>
    </div>
  );
};

export default ProfileDetails;
