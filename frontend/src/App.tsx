import { Box, Grid, GridItem, useBreakpointValue } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import GenreList from "./components/GenreList";
import { Outlet } from "react-router-dom";
import useGameQueryStore from "./store";

function App() {
  const showAside = useBreakpointValue({ base: false, xl: true });
  const backgroundImageUrl = useGameQueryStore((s) => s.backgroundImageUrl);

  return (
    <>
      {backgroundImageUrl && (
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bgImage={`linear-gradient(to bottom, rgba(18, 18, 18, 0) 0%, rgba(18, 18, 18, 1) 60%), url(${backgroundImageUrl})`}
          bgSize="contain"
          bgRepeat="no-repeat"
          filter=" brightness(0.4)"
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
