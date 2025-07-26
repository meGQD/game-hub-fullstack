import apiClient from "@/services/api-client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { FavoriteGame } from "./useProfile"
import type { Game } from "@/features/games/hooks/useGames"
import useAppStore from "@/store"
import { toaster } from "@/components/ui/toaster"

const useAddFavoriteGame = () => {
    const queryClient = useQueryClient()
    const toggleFavoriteGame = useAppStore(s => s.toggleFavoriteGame)

    return useMutation<FavoriteGame, Error, Game>({
        mutationFn: (game: Game) => {
            return apiClient
                        .post<FavoriteGame>("/accounts/profiles/me/favorite_games/", {game_id: game.id})
                        .then(res => res.data)
        },
        onSuccess: (_data, gameToAdd) => {
            toggleFavoriteGame(gameToAdd)
            queryClient.invalidateQueries({ queryKey: ["profile", "me"]})
        },
        onError: (error) => {
            console.error(error.message)
            toaster.create({
            title: "You need to login first",
            type: "error",
            duration: 5000,
            closable: true,
            });
        }
    })
}

export default useAddFavoriteGame;