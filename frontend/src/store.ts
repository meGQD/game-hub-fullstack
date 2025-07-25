import { create } from "zustand";
import { persist } from "zustand/middleware"
import type { Genre } from "./features/genres/hooks/useGenres";
import type { Platform } from "./features/platforms/hooks/usePlatforms";
import type { GameDetail } from "./features/games/hooks/useGameDetails";
import type { User } from "./features/users/hooks/useRegister";

export interface GameQuery {
  genre: Genre | null;
  platform: Platform | null;
  sortOrder: string;
  searchText: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
}

interface AppStore{
  gameQuery : GameQuery;
  backgroundImageUrl : string | null;
  favoriteGame : GameDetail | null;
  auth: AuthState; 
  // Game query actions defaults
  setGenre : (genre: Genre) => void;
  setPlatform : (platform: Platform) => void;
  setSortOrder : (sortOrder: string) => void;
  setSearchText : (searchText: string) => void;

  setBackgroundImageUrl : (url : string | null) => void;
  setFavoriteGame : (game: GameDetail | null) => void;
  // Auth Actions defaults
  login: (authData: {user: User, access: string, refresh: string}) => void;
  logout: () => void;
  setAccessToken: (token: string) => void;
}

const useAppStore = create<AppStore>()(
  persist((set) => ({
    gameQuery : {} as GameQuery,
    backgroundImageUrl : null,
    favoriteGame : null,
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

    setBackgroundImageUrl : (url) => set({ backgroundImageUrl: url}),
    setFavoriteGame : (game) => set({ favoriteGame: game }),

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