import { Box, Grid, GridItem, useBreakpointValue } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import GenreList from "./components/GenreList";
import { Outlet } from "react-router-dom";
import useGameQueryStore from "./store";
import { useColorMode } from "./components/ui/color-mode";

function App() {
  const showAside = useBreakpointValue({ base: false, xl: true });
  const backgroundImageUrl = useGameQueryStore((s) => s.backgroundImageUrl);

  const { colorMode } = useColorMode();

  const gradient =
    colorMode === "dark"
      ? "linear-gradient(to bottom, rgba(18, 18, 18, 0) 0%, rgba(18, 18, 18, 1) 60%)"
      : "linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 60%)";

  return (
    <>
      {backgroundImageUrl && (
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bgImage={`${gradient}, url(${backgroundImageUrl})`}
          bgSize="contain"
          bgRepeat="no-repeat"
          filter=" brightness(0.6)"
          zIndex={-1}
        />
      )}
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
