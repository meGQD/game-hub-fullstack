import { toaster } from "@/components/ui/toaster";
import useAppStore from "@/store";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const logoutAction = useAppStore((s) => s.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAction();
    toaster.create({
      title: "Logged out successfully.",
      type: "warning",
      duration: 5000,
      closable: true,
    });
    navigate("/");
  };

  return (
    <div>
      <Button colorPalette="red" onClick={handleLogout}>
        Log out
      </Button>
    </div>
  );
};

export default LogoutButton;
