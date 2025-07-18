import { Badge } from "@chakra-ui/react";

interface Props {
  score: number;
}

const MetaCriticScore = ({ score }: Props) => {
  let color = score > 75 ? "green" : score > 60 ? "yellow" : "red";
  return (
    <div>
      <Badge
        colorPalette={color}
        fontSize="18px"
        paddingX={4}
        paddingY={2}
        borderRadius={6}
      >
        {score}
      </Badge>
    </div>
  );
};

export default MetaCriticScore;
