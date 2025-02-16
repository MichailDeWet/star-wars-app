import { DefaultTheme } from "styled-components";
import { ReactComponent as JediLogo } from "../assets/img/logos/jedi-logo.svg";
import { ReactComponent as SithLogo } from "../assets/img/logos/sith-logo.svg";

const black = "#000000";
const blue = "#2596be";
const white = "#FFFFFF";
const yellow = "#FFE81F";

const sharedProps: DefaultTheme = {
  /* Fonts */
  bodyFont: "Arial, sans-serif",
  crawlFont: "News Gothic MT, sans-serif",

  /* Sizing */
  headerLinkSize: "1.1rem",
  headerHeight: "92px",
};

export const lightTheme: DefaultTheme = {
  ...sharedProps,
  background: white,
  borderColor: blue,
  color: black,
  crawlColor: blue,
  headingColor: blue,
  linkColor: blue,
  logoColor: blue,
  tableHeadingHoverBackgroundColor: blue,
  tableHeadingHoverColor: white,
  tableOddRowColor: `${blue}20`, // 20% opacity

  /* Images */
  themeToggle: JediLogo,
};

export const darkTheme: DefaultTheme = {
  ...sharedProps,
  background: black,
  borderColor: yellow,
  color: white,
  crawlColor: yellow,
  headingColor: yellow,
  linkColor: yellow,
  logoColor: yellow,
  tableHeadingHoverBackgroundColor: yellow,
  tableHeadingHoverColor: black,
  tableOddRowColor: `${yellow}30`, // 30% opacity

  /* Images */
  themeToggle: SithLogo,
};
