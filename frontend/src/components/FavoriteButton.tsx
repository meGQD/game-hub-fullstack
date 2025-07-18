import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { Button } from "@chakra-ui/react";
import { useState } from "react";

const FavoriteButton = () => {
  const [clicked, setClick] = useState(false);

  return (
    <div>
      <Button variant="surface" onClick={() => setClick(!clicked)}>
        {clicked ? <MdFavorite /> : <MdFavoriteBorder />}
      </Button>
    </div>
  );
};

export default FavoriteButton;
