import { Container, HStack, Image } from "@chakra-ui/react";
import ColorModeSwitch from "./ColorModeSwitch";
import SearchInput from "./SearchInput";
import role from "@/assets/role.svg";
import GenreDrawer from "@/features/genres/components/GenreDrawer";
import { Link } from "react-router-dom";
import ProfileIcon from "@/features/users/components/ProfileIcon";

interface Props {
  showAside: boolean | undefined;
}

const NavBar = ({ showAside }: Props) => {
  return (
    <div>
      <HStack paddingX="20px" paddingY="10px">
        <Link to={"/"}>
          <Image src={role} boxSize="50px" minWidth="50px"></Image>
        </Link>
        <Container fluid>
          <SearchInput />
        </Container>
        <ProfileIcon />
        <ColorModeSwitch />
        {!showAside && <GenreDrawer />}
      </HStack>
    </div>
  );
};

export default NavBar;
