import type { GameQuery } from "@/App";
import { Heading } from "@chakra-ui/react";

interface Props {
  gameQuery: GameQuery;
}

const GameHeading = ({ gameQuery }: Props) => {
  const heading = `
  ${gameQuery.platform?.name || ""} 
  ${gameQuery.genre?.name || ""} Games`;

  return (
    <div>
      <Heading as="h1" fontSize={{ base: "4xl", lg: "5xl" }} marginY={6}>
        {heading}
      </Heading>
    </div>
  );
};

export default GameHeading;
