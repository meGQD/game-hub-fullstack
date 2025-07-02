import { TbBaselineDensityMedium } from "react-icons/tb";
import { Button, CloseButton, Drawer, Portal } from "@chakra-ui/react";
import { useState } from "react";
import type { Genre } from "@/hooks/useGenres";
import GenreList from "./GenreList";

interface Props {
  onSelectGenre: (genre: Genre) => void;
  selectedGenre: Genre | null;
}

const GenreDrawer = ({ onSelectGenre, selectedGenre }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Drawer.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Drawer.Trigger asChild>
        <Button variant="outline" size="xs">
          <TbBaselineDensityMedium />
        </Button>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title></Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <GenreList
                onSelectGenre={onSelectGenre}
                selectedGenre={selectedGenre}
              />
            </Drawer.Body>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export default GenreDrawer;
