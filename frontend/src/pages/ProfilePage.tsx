import ProfileDetails from "@/features/users/components/ProfileDetails";
import useProfile from "@/features/users/hooks/useProfile";
import useAppStore from "@/store";
import { Box, Tabs } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const user = useAppStore((s) => s.auth.user);
  const navigate = useNavigate();

  if (!user) {
    navigate("/auth");
  }

  const { datum, isLoading, error } = useProfile();

  if (!datum) return null;

  return (
    <div>
      <Box justifyContent="center" padding={5} maxW="lg" mx="auto">
        <Tabs.Root defaultValue="profile" variant="outline">
          <Tabs.List>
            <Tabs.Trigger value="profile">Profile</Tabs.Trigger>
            <Tabs.Trigger value="favorite_games">Favorite Games</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="profile">
            <ProfileDetails profile={datum} />
          </Tabs.Content>
          <Tabs.Content value="favorite_games"></Tabs.Content>
        </Tabs.Root>
      </Box>
    </div>
  );
};

export default ProfilePage;
