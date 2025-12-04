import type { Genre } from "@/features/genres/hooks/useGenres";
import type { Platform } from "@/features/platforms/hooks/usePlatforms";
import useDatum from "@/hooks/useDatum";

export interface Screenshot{
    id: number;
    image: string;
}

export interface GameDetail {
    id: number;
    name: string;
    slug: string;
    description: string;
    metacritic: number;
    rating_top: number;
    released: string
    background_image: string;
    genres: Genre[]
    screenshots: Screenshot[];
    parent_platforms: Platform[];
}

const useGameDetail = (slug: string) => useDatum<GameDetail>(`/api/games/${slug}/`)

export default useGameDetail;
