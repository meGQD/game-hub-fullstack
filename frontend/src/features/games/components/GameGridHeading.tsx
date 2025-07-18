import useGameQueryStore from "@/store";
import { Heading } from "@chakra-ui/react";

const GameGridHeading = () => {
  const gameQuery = useGameQueryStore((s) => s.gameQuery);
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

export default GameGridHeading;
