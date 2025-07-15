import { useEffect, useState } from "react";
import type { Platform } from "./usePlatforms";
import apiClient from "@/services/api-client";
import { CanceledError } from "axios";

interface Screenshot{
    id: number;
    image: string;
}

interface GameDetail {
    id: number;
    name: string;
    slug: string;
    description: string;
    background_image: string;
    screenshot: Screenshot[];
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
            .catch((err) => {
                if(err instanceof CanceledError) return;
                setError(err.message)
                setLoading(false)
            })
        return () => controller.abort()
    }, [])
    return {game, error, isLoading}
}

export default useGameDetail;
