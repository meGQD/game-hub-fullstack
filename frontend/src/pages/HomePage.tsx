import GameGrid from "@/features/games/components/GameGrid";
import GameGridHeading from "@/features/games/components/GameGridHeading";
import PlatformList from "@/features/platforms/components/PlatformList";
import SortSelector from "@/components/SortSelector";
import ResetFilters from "@/components/ResetFilters";
import { Box, HStack } from "@chakra-ui/react";

const HomePage = () => {
  return (
    <div>
      <Box padding={3}>
        <GameGridHeading />
        <HStack spaceX={3} marginBottom={5}>
          <PlatformList />
          <SortSelector />
          <ResetFilters />
        </HStack>
        <GameGrid />
      </Box>
    </div>
  );
};

export default HomePage;
