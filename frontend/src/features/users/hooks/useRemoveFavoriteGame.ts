import apiClient from "@/services/api-client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { Game } from "@/features/games/hooks/useGames"
import useAppStore from "@/store"
import { toaster } from "@/components/ui/toaster"
import { useNavigate } from "react-router-dom"

const useRemoveFavoriteGame = () => {
    const queryClient = useQueryClient()
    const toggleFavoriteGame = useAppStore(s => s.toggleFavoriteGame)
    const navigate = useNavigate()

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
                title: "Authorization error",
                description: "You need to sign-in first.",
                type: "error",
                duration: 5000,
                closable: true,
                action: {
                    label: "Sign-in",
                    onClick: () => navigate("/auth")
                }
            });
        }
    })
}

export default useRemoveFavoriteGame;