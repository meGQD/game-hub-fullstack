import { Text } from "@chakra-ui/react";

interface Props {
  heading: string;
}

const GameInformationHeading = ({ heading }: Props) => {
  return (
    <div>
      <Text
        as="h1"
        textTransform="capitalize"
        fontWeight="medium"
        color={{ base: "gray.900", _dark: "gray.600" }}
      >
        {heading}
      </Text>
    </div>
  );
};

export default GameInformationHeading;
