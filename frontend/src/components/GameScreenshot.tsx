import type { Screenshot } from "@/hooks/useGameDetails";
import { Image } from "@chakra-ui/react";

interface Props {
  screenshot: Screenshot | undefined;
}

const GameScreenshot = ({ screenshot }: Props) => {
  return (
    <div>
      <Image src={screenshot?.image} borderRadius={7} />
    </div>
  );
};

export default GameScreenshot;
