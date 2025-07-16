import { Heading } from "@chakra-ui/react";

interface Props {
  name: string;
}

const GameHeading = ({ name }: Props) => {
  return (
    <div>
      <Heading
        as="h1"
        fontSize={{ base: "4xl", md: "7xl" }}
        fontWeight="bold"
        lineHeight={1}
      >
        {name}
      </Heading>
    </div>
  );
};

export default GameHeading;
