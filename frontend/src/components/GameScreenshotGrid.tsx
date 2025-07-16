import { type GameDetail } from "@/hooks/useGameDetails";
import { Button, Grid, GridItem } from "@chakra-ui/react";
import GameScreenshot from "./GameScreenshot";
import { useState } from "react";

interface Props {
  game: GameDetail;
}

const GameScreenshotGrid = ({ game }: Props) => {
  const [isExpanded, setExpanded] = useState(false);

  const screenshots = game.screenshots || [];
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
