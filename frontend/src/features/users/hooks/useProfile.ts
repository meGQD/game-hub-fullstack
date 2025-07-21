import type { Game } from "@/features/games/hooks/useGames"
import useDatum from "@/hooks/useDatum";

export interface Profile{
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    birth_date: string,
    favorite_games: Game[]
}

const useProfile = () => useDatum<Profile>("accounts/profiles/me")

export default useProfile;