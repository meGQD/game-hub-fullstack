import useGameDetail from "@/hooks/useGameDetails";
import { Button, Grid, GridItem, Spinner } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import GameScreenshot from "./GameScreenshot";
import { useState } from "react";

const GameScreenshotGrid = () => {
  const { slug } = useParams();
  const { game, isLoading, error } = useGameDetail(slug!);
  const [isExpanded, setExpanded] = useState(false);

  if (isLoading) return <Spinner />;

  if (error) return null;

  const screenshots = game?.screenshots || [];
  if (screenshots.length <= 1) {
    return null;
  }

  const firstScreenshot = screenshots[1];
  const limit = 6;
  let otherScreenshots = isExpanded
    ? screenshots.slice(2)
    : screenshots.slice(2, limit);

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
        {screenshots.length > limit && (
          <GridItem colSpan={2}>
            <Button width="100%" onClick={() => setExpanded(!isExpanded)}>
              {isExpanded ? "View less ..." : "View more ..."}
            </Button>
          </GridItem>
        )}
      </Grid>
    </div>
  );
};

export default GameScreenshotGrid;
