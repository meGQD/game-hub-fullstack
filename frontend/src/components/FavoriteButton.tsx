import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import type { GameDetail } from "@/features/games/hooks/useGameDetails";
import useGameQueryStore from "@/store";

interface Props {
  game: GameDetail;
}

const FavoriteButton = ({ game }: Props) => {
  const setFavoriteGame = useGameQueryStore((s) => s.setFavoriteGame);
  const favoriteGame = useGameQueryStore((s) => s.favoriteGame);
  const [clicked, setClick] = useState(false);

  useEffect(() => {
    if (clicked) {
      setFavoriteGame(game);
      console.log(clicked, favoriteGame);
    } else {
      setFavoriteGame(null);
      console.log(clicked, favoriteGame);
    }
  }, [clicked, setFavoriteGame, game]);

  return (
    <div>
      <Button
        variant="solid"
        onClick={() => {
          setClick(!clicked);
        }}
      >
        {clicked ? <MdFavorite /> : <MdFavoriteBorder />}
      </Button>
    </div>
  );
};

export default FavoriteButton;
