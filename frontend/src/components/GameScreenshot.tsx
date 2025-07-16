import type { Screenshot } from "@/hooks/useGameDetails";
import getCroppedImageUrl from "@/services/image-url";
import { Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface Props {
  screenshot: Screenshot;
}

const GameScreenshot = ({ screenshot }: Props) => {
  return (
    <div>
      <Link to={screenshot.image}>
        <Image src={getCroppedImageUrl(screenshot.image)} borderRadius={7} />
      </Link>
    </div>
  );
};

export default GameScreenshot;
