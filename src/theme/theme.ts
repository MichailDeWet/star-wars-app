import { DefaultTheme } from "styled-components";
import { ReactComponent as JediLogo } from "../assets/jedi-logo.svg";
import { ReactComponent as SithLogo } from "../assets/sith-logo.svg";

const black = "#000000";
const blue = "#0030FF";
const white = "#FFFFFF";
const yellow = "#FFE81F";

const sharedProps: DefaultTheme = {
  /* Fonts */
  bodyFont: "Arial, sans-serif",
  crawlFont: "News Gothic MT, sans-serif",

  /* Colors */
  crawlColor: yellow,

  /* Sizing */
  headerLinkSize: "1.1rem",
  headerHeight: "92px",
};

export const lightTheme: DefaultTheme = {
  ...sharedProps,
  background: white,
  color: black,
  linkColor: blue,
  logoColor: blue,

  /* Images */
  themeToggle: JediLogo,
};

export const darkTheme: DefaultTheme = {
  ...sharedProps,
  background: black,
  color: white,
  linkColor: yellow,
  logoColor: yellow,

  /* Images */
  themeToggle: SithLogo,
};
