import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import filmsReducer from "./filmsSlice";
import charactersReducer from "./charactersSlice";
import planetsReducer from "./planetsSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    films: filmsReducer,
    characters: charactersReducer,
    planets: planetsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
