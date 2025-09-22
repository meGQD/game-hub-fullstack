import type { Game } from "@/features/games/hooks/useGames"
import useDatum from "@/hooks/useDatum";
import useAppStore from "@/store";

export interface FavoriteGame{
  id: number;
  game: Game;
}

export interface Profile{
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    birth_date: string,
    favorite_games: FavoriteGame[],
    api_request_count: number
}

const useProfile = () => {
  const user = useAppStore(s => s.auth.user)
  return useDatum<Profile>("accounts/profiles/me", [user])
}

export default useProfile;