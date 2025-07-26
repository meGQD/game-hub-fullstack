import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { Button, Spinner } from "@chakra-ui/react";
import useAppStore from "@/store";
import type { Game } from "@/features/games/hooks/useGames";
import useAddFavoriteGame from "@/features/users/hooks/useAddFavoriteGame";
import useRemoveFavoriteGame from "@/features/users/hooks/useRemoveFavoriteGame";

interface Props {
  game: Game;
}

const FavoriteButton = ({ game }: Props) => {
  const favoriteGames = useAppStore((s) => s.favoriteGames);
  const isFavorite = favoriteGames.some((g) => g.game.id === game.id);

  const addFavoriteMutation = useAddFavoriteGame();
  const removeFavoriteMutation = useRemoveFavoriteGame();

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFavoriteMutation.mutate(game);
    } else {
      addFavoriteMutation.mutate(game);
    }
  };

  const isLoading =
    addFavoriteMutation.isPending || removeFavoriteMutation.isPending;

  return (
    <div>
      <Button variant="solid" onClick={handleToggleFavorite}>
        {isLoading ? (
          <Spinner />
        ) : isFavorite ? (
          <MdFavorite />
        ) : (
          <MdFavoriteBorder />
        )}
      </Button>
    </div>
  );
};

export default FavoriteButton;
