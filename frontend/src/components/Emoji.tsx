import meh from "..//assets/meh.webp";
import thumbsUp from "..//assets/thumbs-up.webp";
import bullsEye from "..//assets/bulls-eye.webp";
import { Image, type ImageProps } from "@chakra-ui/react";

interface Props {
  rating: number;
}

const Emoji = ({ rating }: Props) => {
  if (rating < 3) return null;

  const emojiMap: { [key: number]: ImageProps } = {
    3: { src: meh, alt: "meh", boxSize: "25px" },
    4: { src: thumbsUp, alt: "recommended", boxSize: "25px" },
    5: { src: bullsEye, alt: "exceptional", boxSize: "35px" },
  };
  return (
    <div>
      <Image {...emojiMap[rating]} marginTop={1} />
    </div>
  );
};

export default Emoji;
