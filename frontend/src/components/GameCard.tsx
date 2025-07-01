import type { Game } from "@/hooks/useGames";
import { Card, Heading, HStack, Image } from "@chakra-ui/react";
import PlatformIconsList from "./PlatformIconsList";
import MetaCriticScore from "./MetaCriticScore";
import getCroppedImageUrl from "@/services/image-url";
import Emoji from "./Emoji";

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
            <PlatformIconsList
              platforms={game.parent_platforms.map((p) => p.platform)}
            />
            <MetaCriticScore score={game.metacritic} />
          </HStack>
          <Heading size={"3xl"}>{game.name}</Heading>
          <Emoji rating={game.rating_top} />
        </Card.Body>
      </Card.Root>
    </div>
  );
};

export default GameCard;
