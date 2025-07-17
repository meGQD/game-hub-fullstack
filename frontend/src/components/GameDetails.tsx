import { type GameDetail } from "@/hooks/useGameDetails";
import GameHeading from "./GameHeading";
import GameDescription from "./GameDescription";
import GameScreenshotGrid from "./GameScreenshotGrid";
import GameSlug from "./GameSlug";

interface Props {
  game: GameDetail;
  showAside: boolean | undefined;
}

const GameDetails = ({ game, showAside }: Props) => {
  return (
    <>
      <GameSlug slug={game.slug} />
      <GameHeading name={game.name} />
      <GameDescription description={game.description} />
      {!showAside && <GameScreenshotGrid game={game} />}
    </>
  );
};

export default GameDetails;
