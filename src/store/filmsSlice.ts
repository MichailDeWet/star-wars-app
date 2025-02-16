import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Film } from "../models/types";

interface FilmState {
  films: Film[];
  loading: boolean;
  error: string | null;
}

const initialState: FilmState = {
  films: [],
  loading: false,
  error: null,
};

const filmSlice = createSlice({
  name: "films",
  initialState,
  reducers: {
    fetchFilmsStart(state: FilmState) {
      state.loading = true;
      state.error = null;
    },
    fetchFilmsSuccess(state: FilmState, action: PayloadAction<Film[]>) {
      console.log("Success");
      state.films = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchFilmsFailure(state: FilmState, action: PayloadAction<string>) {
      console.log("Error");
      state.loading = false;
      state.error = action.payload;
    },
    sortFilms(state, action: PayloadAction<keyof Film>) {
      const key = action.payload;

      state.films = [...state.films].sort((a, b) => {
        if (key === "release_date") {
          const dateA = new Date(a.release_date).getTime();
          const dateB = new Date(b.release_date).getTime();
          return dateA - dateB;
        }

        if (key === "episode_id") {
          return a.episode_id - b.episode_id;
        }

        return a.title.localeCompare(b.title);
      });
    },
  },
});

export const {
  fetchFilmsStart,
  fetchFilmsSuccess,
  fetchFilmsFailure,
  sortFilms,
} = filmSlice.actions;

export default filmSlice.reducer;
