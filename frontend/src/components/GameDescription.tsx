import { Button, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  description: string;
}

const GameDescription = ({ description }: Props) => {
  const [isExpanded, setExpanded] = useState(false);
  const modifiedDescription = isExpanded
    ? description
    : description.slice(0, 500) + "...";
  return (
    <>
      <Heading as="h1" fontSize="2xl" fontWeight="bold">
        About
      </Heading>
      <Text>
        {modifiedDescription}{" "}
        <Button
          onClick={() => setExpanded(!isExpanded)}
          size="xs"
          variant="subtle"
          height={6}
        >
          {isExpanded ? "less" : "more"}
        </Button>
      </Text>
    </>
  );
};

export default GameDescription;
