import { type GameDetail } from "@/hooks/useGameDetails";
import GameHeading from "./GameHeading";
import GameDescription from "./GameDescription";

interface Props {
  game: GameDetail;
}

const GameDetails = ({ game }: Props) => {
  return (
    <>
      <GameHeading name={game.name} />
      <GameDescription description={game.description} />
    </>
  );
};

export default GameDetails;
