import useData from "../../../hooks/useData";

export interface Genre{
    id:number,
    name: string,
    image_background: string
}

const useGames = () => useData<Genre>("/genres")


export default useGames