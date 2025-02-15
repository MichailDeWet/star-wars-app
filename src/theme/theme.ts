import { DefaultTheme } from "styled-components";

const sharedProps: DefaultTheme = {
  /* Fonts */
  bodyFont: "Arial, sans-serif",
  crawlFont: "News Gothic MT, sans-serif",

  /* Colors */
  crawlColor: "#ffff00",
};

export const lightTheme: DefaultTheme = {
  ...sharedProps,
  background: "#ffffff",
  color: "#000000",
};

export const darkTheme: DefaultTheme = {
  ...sharedProps,
  background: "#121212",
  color: "#ffffff",
};
