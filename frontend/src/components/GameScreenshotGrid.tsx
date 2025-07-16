import useGameDetail from "@/hooks/useGameDetails";
import { Grid, GridItem, Spinner } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import GameScreenshot from "./GameScreenshot";

const GameScreenshotGrid = () => {
  const { slug } = useParams();
  const { game, isLoading, error } = useGameDetail(slug!);

  if (error) return null;

  if (isLoading) return <Spinner />;

  const screenshots = game?.screenshots || [];
  if (screenshots.length <= 1) {
    return null;
  }
  const firstScreenshot = screenshots[1];
  const otherScreenshots = screenshots.slice(2);

  return (
    <div>
      <Grid templateColumns={{ lg: "repeat(1fr, 2)" }} gap={4}>
        <GridItem colSpan={2}>
          <GameScreenshot screenshot={firstScreenshot} />
        </GridItem>
        {otherScreenshots.map((screenshot) => (
          <GridItem key={screenshot.id}>
            <GameScreenshot screenshot={screenshot} />
          </GridItem>
        ))}
      </Grid>
    </div>
  );
};

export default GameScreenshotGrid;
