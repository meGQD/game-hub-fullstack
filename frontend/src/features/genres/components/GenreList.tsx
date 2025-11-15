import useGenres from "@/features/genres/hooks/useGenres";
import getCroppedImageUrl from "@/services/image-url";
import useAppStore from "@/store";
import {
  Button,
  Heading,
  HStack,
  Image,
  List,
  Spinner,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const GenreList = () => {
  const selectedGenre = useAppStore((s) => s.gameQuery.genre);
  const setGenre = useAppStore((s) => s.setGenre);
  const navigate = useNavigate();
  const { data, isLoading } = useGenres();

  if (isLoading) return <Spinner />;

  return (
    <>
      <Heading fontSize="2xl" marginBottom={3}>
        Genres Test
      </Heading>
      <List.Root>
        {data.map((genre) => (
          <List.Item as="ul" key={genre.id} paddingY="5px">
            <HStack>
              <Image
                boxSize="32px"
                borderRadius={8}
                objectFit="cover"
                src={getCroppedImageUrl(genre.image_background)}
              />
              <Button
                fontWeight={genre.id === selectedGenre?.id ? "bold" : "normal"}
                onClick={() => {
                  setGenre(genre);
                  navigate("/");
                }}
                variant="ghost"
                fontSize="lg"
                flex={1}
                justifyContent="flex-start"
                whiteSpace="normal"
                textAlign="left"
              >
                {genre.name}
              </Button>
            </HStack>
          </List.Item>
        ))}
      </List.Root>
    </>
  );
};

export default GenreList;
