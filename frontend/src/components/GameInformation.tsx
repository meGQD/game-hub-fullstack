import type { GameDetail } from "@/hooks/useGameDetails";
import { GridItem, SimpleGrid } from "@chakra-ui/react";
import GameExtraDetailHeading from "./GameInformationHeading";

interface Props {
  game: GameDetail;
}

const GameInformation = ({ game }: Props) => {
  return (
    <div>
      <SimpleGrid columns={2}>
        <GridItem>
          <GameExtraDetailHeading heading="Platforms" />
        </GridItem>
        <GridItem>
          <GameExtraDetailHeading heading="Metascore" />
        </GridItem>
        <GridItem>
          <GameExtraDetailHeading heading="Genre" />
        </GridItem>
        <GridItem>
          <GameExtraDetailHeading heading="Release date" />
        </GridItem>
      </SimpleGrid>
    </div>
  );
};

export default GameInformation;
