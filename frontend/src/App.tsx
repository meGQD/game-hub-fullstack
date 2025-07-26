import { Grid, GridItem, useBreakpointValue } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import GenreList from "./features/genres/components/GenreList";
import { Outlet } from "react-router-dom";
import BackgroundImage from "./components/BackgroundImage";
import { Toaster } from "./components/ui/toaster";
import useProfile from "./features/users/hooks/useProfile";
import useAppStore from "./store";
import { useEffect } from "react";

function App() {
  const showAside = useBreakpointValue({ base: false, xl: true });

  const { datum: profile } = useProfile();
  const setFavoriteGames = useAppStore((s) => s.setFavoriteGames);

  useEffect(() => {
    if (profile) {
      setFavoriteGames(profile.favorite_games);
    }
  }, [profile, setFavoriteGames]);

  return (
    <>
      <BackgroundImage />
      <Toaster />
      <Grid
        templateAreas={{ base: `"nav" "main"`, xl: `"nav nav" "aside main"` }}
        templateColumns={{
          base: "1fr",
          xl: "200px 1fr",
        }}
      >
        <GridItem area="nav">
          <NavBar showAside={showAside} />
        </GridItem>
        {showAside && (
          <GridItem area="aside" paddingX={5}>
            <GenreList />
          </GridItem>
        )}
        <GridItem area="main">
          <Outlet />
        </GridItem>
      </Grid>
    </>
  );
}

export default App;
