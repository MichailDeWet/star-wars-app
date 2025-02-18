import { createSlice } from "@reduxjs/toolkit";
import { LocalStorageKeys } from "../models/enums";

interface ThemeState {
  isDarkMode: boolean;
}

const initialState: ThemeState = {
  isDarkMode: JSON.parse(
    localStorage.getItem(LocalStorageKeys.THEME) ?? "false"
  ), // Default is light mode
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      localStorage.setItem(
        LocalStorageKeys.THEME,
        (!state.isDarkMode).toString()
      );
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
