import ProfileDetailsForm from "@/features/users/components/ProfileDetailsForm";
import ProfileFavoriteGames from "@/features/users/components/ProfileFavoriteGames";
import useProfile from "@/features/users/hooks/useProfile";
import useAppStore from "@/store";
import { Box, Spinner, Tabs, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const user = useAppStore((s) => s.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user]);

  const { datum, isLoading, error } = useProfile();

  if (isLoading) return <Spinner />;

  if (error) return <Text color="red">{error}</Text>;

  if (!datum) return null;

  return (
    <div>
      <Box justifyContent="center" padding={5} mx="auto">
        <Tabs.Root defaultValue="profile" variant="line">
          <Tabs.List>
            <Tabs.Trigger value="profile" fontSize="2xl">
              Profile
            </Tabs.Trigger>
            <Tabs.Trigger value="favorite_games" fontSize="2xl">
              Favorite Games
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="profile">
            <ProfileDetailsForm profile={datum} />
          </Tabs.Content>
          <Tabs.Content value="favorite_games">
            <ProfileFavoriteGames
              games={datum.favorite_games.map((g) => g.game)}
            />
          </Tabs.Content>
        </Tabs.Root>
      </Box>
    </div>
  );
};

export default ProfilePage;
