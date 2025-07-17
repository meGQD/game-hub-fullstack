import { Box } from "@chakra-ui/react";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const GameReleasedDateContainer = ({ children }: Props) => {
  return (
    <div>
      <Box
        bgColor={{ base: "whiteAlpha.400", _dark: "blackAlpha.500" }}
        borderRadius={5}
        paddingX={2}
        paddingY={"2px"}
      >
        {children}
      </Box>
    </div>
  );
};

export default GameReleasedDateContainer;
