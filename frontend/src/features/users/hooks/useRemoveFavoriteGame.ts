import apiClient from "@/services/api-client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { Game } from "@/features/games/hooks/useGames"
import useAppStore from "@/store"
import { toaster } from "@/components/ui/toaster"

const useRemoveFavoriteGame = () => {
    const queryClient = useQueryClient()
    const toggleFavoriteGame = useAppStore(s => s.toggleFavoriteGame)

    return useMutation<void, Error, Game>({
        mutationFn: (game: Game) => {
            return apiClient
                        .delete(`/accounts/profiles/me/favorite_games/${game.slug}/`)
                        .then(res => res.data)
        },
        onSuccess: (_data, gameToRemove) => {
            toggleFavoriteGame(gameToRemove)
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

export default useRemoveFavoriteGame;