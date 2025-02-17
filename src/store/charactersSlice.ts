import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Character, SortPayload, TSortDirection } from "../models/types";
import { sortItems } from "../utils/tableUtils";

interface CharactersState {
  characters: Character[];
  sortKey: keyof Character | undefined;
  sortDirection: TSortDirection;
  loading: boolean;
  error: string | null;
}

const initialState: CharactersState = {
  characters: [],
  sortKey: undefined,
  sortDirection: "asc",
  loading: false,
  error: null,
};

const characterSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    fetchCharactersStart(state: CharactersState) {
      state.loading = true;
      state.error = null;
    },
    fetchCharactersSuccess(
      state: CharactersState,
      action: PayloadAction<Character[]>
    ) {
      state.characters = [...state.characters, ...action.payload];
      state.loading = false;
      state.error = null;
    },
    fetchCharactersFailure(
      state: CharactersState,
      action: PayloadAction<string>
    ) {
      state.loading = false;
      state.error = action.payload;
    },
    sortCharacters(
      state: CharactersState,
      action: PayloadAction<SortPayload<Character>>
    ) {
      const { key, sortableType } = action.payload;
      const sortDirection =
        state.sortKey === key && state.sortDirection === "asc" ? "desc" : "asc";

      state.sortDirection = sortDirection;
      state.sortKey = key;
      state.characters = sortItems(
        [...state.characters],
        key,
        sortDirection,
        sortableType
      );
    },
  },
});

export const {
  fetchCharactersStart,
  fetchCharactersSuccess,
  fetchCharactersFailure,
  sortCharacters,
} = characterSlice.actions;

export default characterSlice.reducer;
