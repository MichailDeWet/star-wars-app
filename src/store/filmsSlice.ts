import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Film, SortPayload, TSortDirection } from "../models/types";
import { sortItems } from "../utils/tableUtils";

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
    sortFilms(state: FilmState, action: PayloadAction<SortPayload<Film>>) {
      const { key, sortableType } = action.payload;
      const sortDirection =
        state.sortKey === key && state.sortDirection === "asc" ? "desc" : "asc";

      state.sortDirection = sortDirection;
      state.sortKey = key;
      state.films = sortItems(
        [...state.films],
        key,
        sortDirection,
        sortableType
      );
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
