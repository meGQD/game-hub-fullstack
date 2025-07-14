import GameGrid from "@/components/GameGrid";
import GameHeading from "@/components/GameHeading";
import PlatformList from "@/components/PlatformList";
import SortSelector from "@/components/SortSelector";
import { Box, HStack } from "@chakra-ui/react";

const HomePage = () => {
  return (
    <div>
      <Box padding={3}>
        <GameHeading />
        <HStack spaceX={3} marginBottom={5}>
          <PlatformList />
          <SortSelector />
        </HStack>
        <GameGrid />
      </Box>
    </div>
  );
};

export default HomePage;
