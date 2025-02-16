import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Character } from "../models/types";

interface CharactersState {
  characters: Record<string, Character>;
}

const initialState: CharactersState = {
  characters: {},
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
