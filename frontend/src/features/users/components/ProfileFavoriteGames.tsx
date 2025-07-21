import GameCard from "@/features/games/components/GameCard";
import GameCardContainer from "@/features/games/components/GameCardContainer";
import type { Game } from "@/features/games/hooks/useGames";
import { SimpleGrid } from "@chakra-ui/react";

interface Props {
  games: Game[];
}

const ProfileFavoriteGames = ({ games }: Props) => {
  return (
    <div>
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, "2xl": 4 }}
        columnGap={6}
        rowGap={6}
      >
        {games.map((game) => (
          <GameCardContainer key={game.id}>
            <GameCard game={game} />
          </GameCardContainer>
        ))}
      </SimpleGrid>
    </div>
  );
};

export default ProfileFavoriteGames;
