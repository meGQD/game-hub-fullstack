import type { GameDetail } from "@/hooks/useGameDetails";
import { GridItem, HStack, SimpleGrid, Text } from "@chakra-ui/react";
import MetaCriticScore from "./MetaCriticScore";
import GameReleasedDate from "./GameReleasedDate";
import GameInformationHeading from "./GameInformationHeading";

interface Props {
  game: GameDetail;
}

const GameInformation = ({ game }: Props) => {
  return (
    <div>
      <SimpleGrid columns={2} rowGap={7} columnGap={5}>
        <GridItem>
          <GameInformationHeading heading="Platforms" />
          <HStack flexWrap="wrap">
            {game.parent_platforms.map((platform) => (
              <Text>{platform.name},</Text>
            ))}
          </HStack>
        </GridItem>
        <GridItem>
          <GameInformationHeading heading="Metascore" />
          <MetaCriticScore score={game.metacritic} />
        </GridItem>
        <GridItem>
          <GameInformationHeading heading="Genre" />
          <HStack flexWrap="wrap">
            {game.genres.map((genre) => (
              <Text>{genre.name},</Text>
            ))}
          </HStack>
        </GridItem>
        <GridItem>
          <GameInformationHeading heading="Release date" />
          <GameReleasedDate released={game.released} />
        </GridItem>
      </SimpleGrid>
    </div>
  );
};

export default GameInformation;
