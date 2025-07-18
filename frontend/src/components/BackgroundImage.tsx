import { Box } from "@chakra-ui/react";
import { useColorMode } from "./ui/color-mode";
import useGameQueryStore from "@/store";

const BackgroundImage = () => {
  const backgroundImageUrl = useGameQueryStore((s) => s.backgroundImageUrl);
  const { colorMode } = useColorMode();

  const gradient =
    colorMode === "dark"
      ? "linear-gradient(to bottom, rgba(18, 18, 18, 0) 0%, rgba(18, 18, 18, 1) 60%)"
      : "linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 60%)";

  return (
    <div>
      {backgroundImageUrl && (
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bgImage={`${gradient}, url(${backgroundImageUrl})`}
          bgSize="contain"
          bgRepeat="no-repeat"
          filter={{ base: "brightness(1)", _dark: "brightness(0.4)" }}
          zIndex={-1}
        />
      )}
    </div>
  );
};

export default BackgroundImage;
