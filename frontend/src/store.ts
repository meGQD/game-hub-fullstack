import { create } from "zustand";
import type { Genre } from "./hooks/useGenres";
import type { Platform } from "./hooks/usePlatforms";

export interface GameQuery {
  genre: Genre | null;
  platform: Platform | null;
  sortOrder: string;
  searchText: string;
}

interface GameQueryStore{
    gameQuery : GameQuery;
    backgroundImageUrl : string | null;
    setGenre : (genre: Genre) => void;
    setPlatform : (platform: Platform) => void;
    setSortOrder : (sortOrder: string) => void;
    setSearchText : (searchText: string) => void;
    setBackgroundImageUrl : (url : string | null) => void;
}

const useGameQueryStore = create<GameQueryStore>((set) => ({
    gameQuery : {} as GameQuery,
    backgroundImageUrl : null,
    setGenre : (genre) => set((store) => ({gameQuery: {...store.gameQuery, genre}})),
    setPlatform : (platform) => set((store) => ({gameQuery: {...store.gameQuery, platform}})),
    setSortOrder : (sortOrder) => set((store) => ({gameQuery: {...store.gameQuery, sortOrder}})),
    setSearchText : (searchText) => set((store) => ({gameQuery: {...store.gameQuery, searchText}})),
    setBackgroundImageUrl : (url) => set({ backgroundImageUrl: url}),
}))

export default useGameQueryStore;