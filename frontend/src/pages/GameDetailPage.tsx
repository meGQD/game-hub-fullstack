import useGameDetails from "@/hooks/useGameDetails";
import { useParams } from "react-router-dom";

const GameDetailPage = () => {
  const { slug } = useParams();
  const { game, error, isLoading } = useGameDetails(slug!);
  return (
    <>
      <h1>Game detail page</h1>
      <p>detail for game: {slug}</p>
      <p>{game?.name}</p>
      <p>{game?.description}</p>
    </>
  );
};

export default GameDetailPage;
