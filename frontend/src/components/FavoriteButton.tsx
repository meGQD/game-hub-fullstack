import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { Button } from "@chakra-ui/react";
import type { GameDetail } from "@/features/games/hooks/useGameDetails";
import useAppStore from "@/store";

interface Props {
  game: GameDetail;
}

const FavoriteButton = ({ game }: Props) => {
  const favoriteGames = useAppStore((s) => s.favoriteGames);
  const toggleFavoriteGame = useAppStore((s) => s.toggleFavoriteGame);
  const isFavorite = favoriteGames.some((g) => g.game.id === game.id);

  return (
    <div>
      <Button variant="solid" onClick={() => toggleFavoriteGame(game)}>
        {isFavorite ? <MdFavorite /> : <MdFavoriteBorder />}
      </Button>
    </div>
  );
};

export default FavoriteButton;
