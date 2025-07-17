import { Text } from "@chakra-ui/react";

interface Props {
  slug: string;
}

const GameSlug = ({ slug }: Props) => {
  return (
    <Text
      as="p"
      fontSize="2xs"
      fontWeight="normal"
      textTransform="uppercase"
      letterSpacing={2}
      color={{ base: "gray.900", _dark: "gray.400" }}
    >
      GAMES / {slug}
    </Text>
  );
};

export default GameSlug;
