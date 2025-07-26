import { Box } from "@chakra-ui/react";
import { useColorMode } from "./ui/color-mode";
import useAppStore from "@/store";

const BackgroundImage = () => {
  const backgroundImageUrl = useAppStore((s) => s.backgroundImageUrl);
  const { colorMode } = useColorMode();

  return (
    <div>
      {backgroundImageUrl && (
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bgImage={`url(${backgroundImageUrl})`}
          bgSize="contain"
          bgRepeat="no-repeat"
          filter={{ base: "brightness(1)", _dark: "brightness(0.4)" }}
          zIndex={-1}
        >
          <Box
            // Handle dynamic gradient
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bgImage={{
              base:
                colorMode === "dark"
                  ? "linear-gradient(to bottom, rgba(18, 18, 18, 0) 0%, rgba(18, 18, 18, 1) 20%)"
                  : "linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 20%)",
              lg:
                colorMode === "dark"
                  ? "linear-gradient(to bottom, rgba(18, 18, 18, 0) 0%, rgba(18, 18, 18, 1) 60%)"
                  : "linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 60%)",
            }}
          />
        </Box>
      )}
    </div>
  );
};

export default BackgroundImage;
