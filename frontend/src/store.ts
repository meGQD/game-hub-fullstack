import { create } from "zustand";
import { persist } from "zustand/middleware"
import type { Genre } from "./features/genres/hooks/useGenres";
import type { Platform } from "./features/platforms/hooks/usePlatforms";
import type { User } from "./features/users/hooks/useRegister";
import type { Game } from "./features/games/hooks/useGames";
import type { FavoriteGame } from "./features/users/hooks/useProfile";

export interface GameQuery {
  genre?: Genre | null;
  platform?: Platform | null;
  sortOrder?: string;
  searchText?: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
}

interface AppStore{
  gameQuery : GameQuery;
  backgroundImageUrl : string | null;
  favoriteGames : FavoriteGame[]
  auth: AuthState; 
  // Game query actions defaults
  setGenre : (genre: Genre) => void;
  setPlatform : (platform: Platform) => void;
  setSortOrder : (sortOrder: string) => void;
  setSearchText : (searchText: string) => void;
  resetGameQuery: () => void;

  setBackgroundImageUrl : (url : string | null) => void;
  setFavoriteGames: (games: FavoriteGame[]) => void;
  toggleFavoriteGame: (game: Game) => void;
  // Auth Actions defaults
  login: (authData: {user: User, access: string, refresh: string}) => void;
  logout: () => void;
  setAccessToken: (token: string) => void;
}

const useAppStore = create<AppStore>()(
  persist((set) => ({
    gameQuery : {},
    backgroundImageUrl : null,
    favoriteGames : [],
    auth : {
      user: null,
      accessToken: null,
      refreshToken: null,
    },
    // Game query actions
    setGenre : (genre) => set((store) => ({gameQuery: {...store.gameQuery, genre}})),
    setPlatform : (platform) => set((store) => ({gameQuery: {...store.gameQuery, platform}})),
    setSortOrder : (sortOrder) => set((store) => ({gameQuery: {...store.gameQuery, sortOrder}})),
    setSearchText : (searchText) => set((store) => ({gameQuery: {...store.gameQuery, searchText}})),
    resetGameQuery: () => set({gameQuery: {}}),

    setBackgroundImageUrl : (url) => set({ backgroundImageUrl: url}),

    setFavoriteGames: (games) => set({favoriteGames: games}),
    toggleFavoriteGame: (game) => set((store) => {
      const isFavorite = store.favoriteGames.some((g) => g.game.id === game.id);
      if (isFavorite){
        return{
          favoriteGames: store.favoriteGames.filter((g) => g.game.id !== game.id),
        };
      } else {
        // temporary add id field for storing a new favorite game
        const newFavoriteGame: FavoriteGame = {id: -1, game: game}
        return {favoriteGames: [...store.favoriteGames, newFavoriteGame]}
      }
    }) ,

    // Auth actions
    login : (authData) => set((store) => ({auth: {...store.auth, user: authData.user, accessToken: authData.access, refreshToken: authData.refresh}})),
    logout : () => set((store) => ({auth: {...store.auth, user: null, accessToken: null, refreshToken: null}})),
    setAccessToken : (token) => set((store) => ({auth: {...store.auth, accessToken: token}}))
  }),
  {
    name: "auth-storage",
    partialize: (state) => ({ auth: state.auth })
  }
  )
)

export default useAppStore;