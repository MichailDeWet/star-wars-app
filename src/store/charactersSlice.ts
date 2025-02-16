import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Character, TSortDirection } from "../models/types";

interface CharactersState {
  characters: Record<string, Character>;
  sortKey: keyof Character | undefined;
  sortDirection: TSortDirection;
  loading: boolean;
  error: string | null;
}

const initialState: CharactersState = {
  characters: {},
  sortKey: undefined,
  sortDirection: "asc",
  loading: false,
  error: null,
};

const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    setCharacters(state, action: PayloadAction<Record<string, Character>>) {
      state.characters = { ...state.characters, ...action.payload };
    },
  },
});

export const { setCharacters } = charactersSlice.actions;

export default charactersSlice.reducer;
