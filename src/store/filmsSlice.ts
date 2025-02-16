import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Film, TSortDirection } from "../models/types";

interface FilmState {
  films: Film[];
  sortKey: keyof Film;
  sortDirection: TSortDirection;
  loading: boolean;
  error: string | null;
}

const initialState: FilmState = {
  films: [],
  sortKey: "release_date",
  sortDirection: "asc",
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
      state.films = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchFilmsFailure(state: FilmState, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    sortFilms(state, action: PayloadAction<keyof Film>) {
      const key = action.payload;
      const sortDirection =
        state.sortKey === key && state.sortDirection === "asc" ? "desc" : "asc";

      state.sortDirection = sortDirection;
      state.sortKey = key;
      state.films = [...state.films].sort((a, b) => {
        if (key === "release_date") {
          const dateA = new Date(a.release_date).getTime();
          const dateB = new Date(b.release_date).getTime();

          if (sortDirection === "asc") {
            return dateA - dateB;
          }

          return dateB - dateA;
        }

        if (key === "episode_id") {
          if (sortDirection === "asc") {
            return a.episode_id - b.episode_id;
          }

          return b.episode_id - a.episode_id;
        }

        if (sortDirection === "asc") {
          return a.title.localeCompare(b.title);
        }

        return b.title.localeCompare(a.title);
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
