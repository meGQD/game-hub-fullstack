import useAppStore from "@/store";
import { Avatar } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const ProfileIcon = () => {
  const user = useAppStore((s) => s.auth.user);

  return (
    <div>
      <Link to={"/profile"}>
        <Avatar.Root colorPalette={user ? "cyan" : ""}>
          <Avatar.Fallback
            name={user ? `${user.first_name} ${user.last_name}` : ""}
          />
        </Avatar.Root>
      </Link>
    </div>
  );
};

export default ProfileIcon;
