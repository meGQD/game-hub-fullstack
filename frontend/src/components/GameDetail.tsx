import useGameDetails from "@/hooks/useGameDetails";
import useGameQueryStore from "@/store";
import { Spinner, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const GameDetail = () => {
  const { slug } = useParams();
  const { game, error, isLoading } = useGameDetails(slug!);
  const setBackgroundImageUrl = useGameQueryStore(
    (s) => s.setBackgroundImageUrl
  );

  useEffect(() => {
    if (game) {
      setBackgroundImageUrl(game.background_image);
    }
    return () => {
      setBackgroundImageUrl(null);
    };
  }, [game, setBackgroundImageUrl]);

  if (isLoading) return <Spinner />;

  if (error) return <Text color="red">{error}</Text>;

  return (
    <>
      <h1>Game detail page</h1>
      <p>{game?.name}</p>
      <p>{game?.description}</p>
    </>
  );
};

export default GameDetail;
