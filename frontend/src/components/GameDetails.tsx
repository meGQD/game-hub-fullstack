import { type GameDetail } from "@/hooks/useGameDetails";
import GameHeading from "./GameHeading";
import GameDescription from "./GameDescription";
import GameScreenshotGrid from "./GameScreenshotGrid";
import GameSlug from "./GameSlug";
import { HStack } from "@chakra-ui/react";
import GameReleasedDate from "./GameReleasedDate";
import GameReleasedDateContainer from "./GameReleasedDateContainer";
import PlatformIconsList from "./PlatformIconsList";

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
      <GameDescription description={game.description} />
      {!showAside && <GameScreenshotGrid game={game} />}
    </>
  );
};

export default GameDetails;
