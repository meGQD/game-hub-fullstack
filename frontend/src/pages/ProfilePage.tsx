import ProfileDetails from "@/features/users/components/ProfileDetails";
import ProfileFavoriteGames from "@/features/users/components/ProfileFavoriteGames";
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
            <ProfileDetails profile={datum} />
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
