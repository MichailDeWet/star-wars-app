import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import filmReducer from "./filmsSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    films: filmReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
