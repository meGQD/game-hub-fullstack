import { Box, Text } from "@chakra-ui/react";

interface Props {
  heading: string;
}

const GameInformationHeading = ({ heading }: Props) => {
  return (
    <div>
      <Box marginBottom={2}>
        <Text
          as="h1"
          textTransform="capitalize"
          fontWeight="medium"
          color={{ base: "gray.600", _dark: "gray.600" }}
        >
          {heading}
        </Text>
      </Box>
    </div>
  );
};

export default GameInformationHeading;
