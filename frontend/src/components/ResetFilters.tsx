import useAppStore from "@/store";
import { Button } from "@chakra-ui/react";
import { IoMdCloseCircleOutline } from "react-icons/io";

const ResetFilters = () => {
  const gameQuery = useAppStore((s) => s.gameQuery);
  const resetGameQuery = useAppStore((s) => s.resetGameQuery);

  const handleReset = () => {
    resetGameQuery();
  };

  const hasActiveFilters = Object.values(gameQuery).some((value) => value);

  if (!hasActiveFilters) return null;

  return (
    <div>
      <Button
        onClick={handleReset}
        fontSize="xs"
        paddingX={2}
        paddingRight={3}
        paddingY={5}
        borderRadius={20}
      >
        <IoMdCloseCircleOutline />
        Reset filters
      </Button>
    </div>
  );
};

export default ResetFilters;
