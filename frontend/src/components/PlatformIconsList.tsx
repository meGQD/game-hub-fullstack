import {
  FaWindows,
  FaPlaystation,
  FaXbox,
  FaApple,
  FaLinux,
  FaAndroid,
  FaNeos,
} from "react-icons/fa";
import { MdPhoneIphone } from "react-icons/md";
import {
  SiNintendo,
  SiSega,
  SiAtari,
  SiD3Dotjs,
  SiCommodore,
} from "react-icons/si";
import { BsGlobe } from "react-icons/bs";
import type { Platform } from "@/hooks/usePlatforms";
import { HStack, Icon } from "@chakra-ui/react";
import type { IconType } from "react-icons";

interface Props {
  platforms: Platform[];
}

const PlatformIconsList = ({ platforms }: Props) => {
  const iconMap: { [key: string]: IconType } = {
    pc: FaWindows,
    playstation: FaPlaystation,
    xbox: FaXbox,
    ios: MdPhoneIphone,
    android: FaAndroid,
    mac: FaApple,
    linux: FaLinux,
    nintendo: SiNintendo,
    atari: SiAtari,
    "commodore-amiga": SiCommodore,
    sega: SiSega,
    "3do": SiD3Dotjs,
    "neo-geo": FaNeos,
    web: BsGlobe,
  };

  return (
    <HStack>
      {platforms.map((platform) => (
        <Icon
          as={iconMap[platform.slug]}
          color={{ base: "black", _dark: "white" }}
          key={platform.id}
        />
      ))}
    </HStack>
  );
};

export default PlatformIconsList;
