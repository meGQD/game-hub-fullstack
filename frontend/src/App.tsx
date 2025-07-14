import { Grid, GridItem, useBreakpointValue } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import GenreList from "./components/GenreList";
import { Outlet } from "react-router-dom";

function App() {
  const showAside = useBreakpointValue({ base: false, lg: true });

  return (
    <>
      <Grid
        templateAreas={{ base: `"nav" "main"`, lg: `"nav nav" "aside main"` }}
        templateColumns={{
          base: "1fr",
          lg: "200px 1fr",
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
