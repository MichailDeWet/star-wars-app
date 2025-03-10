import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Character,
  SortPayload,
  TEntityPromise,
  TSortDirection,
} from "../models/types";
import { sortItems } from "../utils/tableUtils";
import { uniqBy } from "lodash-es";

interface CharactersState {
  characters: Character[];
  sortKey: keyof Character | undefined;
  sortDirection: TSortDirection;
  loading: boolean;
  error: string[] | null;
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
      action: PayloadAction<TEntityPromise<Character>>
    ) {
      const { responses, errors } = action.payload;
      state.characters = uniqBy([...state.characters, ...responses], "url");
      state.loading = false;
      state.error = errors;
    },
    fetchCharactersFailure(
      state: CharactersState,
      action: PayloadAction<string[]>
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
