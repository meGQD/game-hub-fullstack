import { Text } from "@chakra-ui/react";

interface Props {
  released: string;
}

const GameReleasedDate = ({ released }: Props) => {
  const releasedDate = new Date(released);

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(releasedDate);

  return (
    <div>
      <Text
        as="p"
        fontSize="xs"
        fontWeight="normal"
        textTransform="uppercase"
        letterSpacing={2}
      >
        {formattedDate}
      </Text>
    </div>
  );
};

export default GameReleasedDate;
