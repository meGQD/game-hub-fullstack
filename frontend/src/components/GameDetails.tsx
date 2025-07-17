import { type GameDetail } from "@/hooks/useGameDetails";
import GameHeading from "./GameHeading";
import GameDescription from "./GameDescription";
import GameScreenshotGrid from "./GameScreenshotGrid";
import GameSlug from "./GameSlug";
import { Box, HStack } from "@chakra-ui/react";
import GameReleasedDate from "./GameReleasedDate";
import GameReleasedDateContainer from "./GameReleasedDateContainer";
import PlatformIconsList from "./PlatformIconsList";
import GameExtraDetails from "./GameInformation";

interface Props {
  game: GameDetail;
  showAside: boolean | undefined;
}

const GameDetails = ({ game, showAside }: Props) => {
  return (
    <>
      <GameSlug slug={game.slug} />
      <HStack marginTop={7} spaceX={2}>
        <GameReleasedDateContainer>
          <GameReleasedDate released={game.released} />
        </GameReleasedDateContainer>
        <PlatformIconsList platforms={game.parent_platforms} />
      </HStack>
      <GameHeading name={game.name} />
      <Box marginY={5}>
        <GameDescription description={game.description} />
      </Box>
      {!showAside && <GameScreenshotGrid game={game} />}
      <GameExtraDetails game={game} />
    </>
  );
};

export default GameDetails;
