import { Avatar } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const ProfileIcon = () => {
  return (
    <div>
      <Link to={"/profile"}>
        <Avatar.Root>
          <Avatar.Fallback name="mamad karimi" />
        </Avatar.Root>
      </Link>
    </div>
  );
};

export default ProfileIcon;
