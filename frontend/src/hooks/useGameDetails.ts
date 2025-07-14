import { useEffect, useState } from "react";
import type { Platform } from "./usePlatforms";
import apiClient from "@/services/api-client";

interface GameDetail {
    id: number,
    name: string;
    slug: string;
    description: string;
    background_image: string;
    parent_platforms: Platform[];
    metacritic: number;
    rating_top: number;
}

const useGameDetail = (slug: string) => {
    const [game, setGame] = useState<GameDetail>()
    const [error, setError] = useState("")
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        const controller = new AbortController()
        setLoading(true)

        apiClient
            .get(`games/${slug}`, {signal: controller.signal})
            .then(res => {
                setGame(res.data)
                setLoading(false)
            })
            .catch(err => {
                setError(err.message)
                setLoading(false)
            })
        return () => controller.abort()
    }, [])
    return {game, error, isLoading}
}

export default useGameDetail;
