import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import filmsReducer from "./filmsSlice";
import charactersReducer from "./charactersSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    films: filmsReducer,
    characters: charactersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
