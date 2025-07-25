import type { Game } from "@/features/games/hooks/useGames";
import { Card, Heading, HStack, Image } from "@chakra-ui/react";
import PlatformIconsList from "@/features/platforms/components/PlatformIconsList";
import getCroppedImageUrl from "@/services/image-url";
import Emoji from "./Emoji";
import { Link } from "react-router-dom";
import MetaCriticScore from "./MetaCriticScore";
import FavoriteButton from "@/components/FavoriteButton";

interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => {
  return (
    <div>
      <Card.Root>
        <Image src={getCroppedImageUrl(game.background_image)} />
        <Card.Body>
          <HStack justifyContent="space-between" marginBottom={3}>
            <PlatformIconsList platforms={game.parent_platforms} />
            <MetaCriticScore score={game.metacritic} />
          </HStack>
          <Link to={`/games/${game.slug}`}>
            <Heading size={"3xl"}>{game.name}</Heading>
          </Link>
          <HStack justifyContent="space-between">
            <Emoji rating={game.rating_top} />
            <FavoriteButton game={game} variant="ghost" />
          </HStack>
        </Card.Body>
      </Card.Root>
    </div>
  );
};

export default GameCard;
