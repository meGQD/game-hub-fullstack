import GameDetail from "@/components/GameDetail";
import GameScreenshotGrid from "@/components/GameScreenshotGrid";
import { Box, Grid, GridItem, useBreakpointValue } from "@chakra-ui/react";

const GameDetailPage = () => {
  const showAside = useBreakpointValue({ base: false, lg: true });

  return (
    <>
      <Box padding={5}>
        <Grid
          templateAreas={{ base: `"main"`, lg: `"main side"` }}
          templateColumns={{ base: "450px", lg: "550px 400px" }}
          justifyContent="center"
        >
          <GridItem area="main">
            <GameDetail />
          </GridItem>
          {showAside && (
            <GridItem area="side">
              <GameScreenshotGrid />
            </GridItem>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default GameDetailPage;
