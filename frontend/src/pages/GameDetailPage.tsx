import { useParams } from "react-router-dom";

const GameDetailPage = () => {
  const { slug } = useParams();
  return (
    <>
      <h1>Game detail page</h1>
      <p>detail for game: {slug}</p>
    </>
  );
};

export default GameDetailPage;
