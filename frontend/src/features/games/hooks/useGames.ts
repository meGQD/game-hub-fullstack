import type { GameQuery } from "@/store";
import type { Platform } from "@/features/platforms/hooks/usePlatforms";
import useData from "@/hooks/useData";

export interface Game {
  id: number;
  name: string;
  slug: string
  background_image: string;
  parent_platforms: Platform[];
  metacritic: number
  rating_top: number
}

const useGames = (gameQuery: GameQuery) => useData<Game>("/games", 
  {params:
    { genres: gameQuery?.genre?.id,
      parent_platforms: gameQuery?.platform?.id,
      ordering: gameQuery.sortOrder,
      search: gameQuery.searchText
    }
  }, [gameQuery])

export default useGames