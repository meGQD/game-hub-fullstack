import type { Screenshot } from "@/hooks/useGameDetails";
import getCroppedImageUrl from "@/services/image-url";
import { Image } from "@chakra-ui/react";

interface Props {
  screenshot: Screenshot;
}

const GameScreenshot = ({ screenshot }: Props) => {
  return (
    <div>
      <Image src={getCroppedImageUrl(screenshot?.image)} borderRadius={7} />
    </div>
  );
};

export default GameScreenshot;
