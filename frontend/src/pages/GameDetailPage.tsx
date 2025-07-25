import GameDetails from "@/features/games/components/GameDetails";
import GameScreenshotGrid from "@/features/games/components/GameScreenshotGrid";
import useGameDetails from "@/features/games/hooks/useGameDetails";
import useAppStore from "@/store";
import {
  Box,
  Grid,
  GridItem,
  Spinner,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const GameDetailPage = () => {
  const showScreenshotsSide = useBreakpointValue({ base: false, lg: true });
  const { slug } = useParams();
  const { datum: game, error, isLoading } = useGameDetails(slug!);

  const setBackgroundImageUrl = useAppStore((s) => s.setBackgroundImageUrl);

  useEffect(() => {
    if (game) {
      setBackgroundImageUrl(game.background_image);
    }
    return () => {
      setBackgroundImageUrl(null);
    };
  }, [game, setBackgroundImageUrl]);

  if (isLoading) return <Spinner />;

  if (error) return <Text color="red">{error}</Text>;

  if (!game) return null;

  return (
    <>
      <Box padding={5}>
        <Grid
          templateAreas={{ base: `"main"`, lg: `"main side"` }}
          templateColumns={{ base: "450px", lg: "550px 400px" }}
          justifyContent="center"
          spaceX={10}
        >
          <GridItem area="main">
            <GameDetails
              showScreenshotsSide={showScreenshotsSide}
              game={game}
            />
          </GridItem>
          {showScreenshotsSide && (
            <GridItem area="side">
              <GameScreenshotGrid game={game} />
            </GridItem>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default GameDetailPage;
