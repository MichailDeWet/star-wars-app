import { DefaultTheme } from "styled-components";
import { ReactComponent as JediLogo } from "../assets/img/logos/jedi-logo.svg";
import { ReactComponent as SithLogo } from "../assets/img/logos/sith-logo.svg";
import { ReactComponent as Chewbacca } from "../assets/img/icons/chewbacca.svg";
import { ReactComponent as DarthVader } from "../assets/img/icons/darth-vader.svg";
import LightBackground from "../assets/img/backgrounds/hero-background-light.webp";
import DarkBackground from "../assets/img/backgrounds/hero-background-dark.webp";

const black = "#000000";
const blue = "#2596BE";
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
  backButton: `${blue}60`,
  backButtonHover: blue,
  background: white,
  boxShadow: `${black}60`,
  borderColor: blue,
  caretColor: blue,
  color: black,
  crawlColor: blue,
  detailedIconColor: `${blue}80`,
  headingColor: blue,
  linkColor: blue,
  loadingIconColor: blue,
  loadingTextColor: blue,
  logoColor: blue,
  tableHeadingHoverBackgroundColor: blue,
  tableHeadingHoverColor: white,
  tableOddRowColor: `${blue}20`, // 20% opacity

  /* Images */
  heroBackground: LightBackground,
  loadingIcon: Chewbacca,
  themeToggle: JediLogo,

  /* Misc */
  pageLoadingText: "Rrraaaaarrrgh!",
};

export const darkTheme: DefaultTheme = {
  ...sharedProps,
  backButton: `${yellow}60`,
  backButtonHover: yellow,
  background: black,
  boxShadow: `${yellow}30`,
  borderColor: yellow,
  caretColor: yellow,
  color: white,
  crawlColor: yellow,
  detailedIconColor: `${yellow}90`,
  headingColor: yellow,
  linkColor: yellow,
  loadingIconColor: yellow,
  loadingTextColor: yellow,
  logoColor: yellow,
  tableHeadingHoverBackgroundColor: yellow,
  tableHeadingHoverColor: black,
  tableOddRowColor: `${yellow}30`, // 30% opacity

  /* Images */
  heroBackground: DarkBackground,
  loadingIcon: DarthVader,
  themeToggle: SithLogo,

  /* Misc */
  pageLoadingText: "You will wait, or face the consequences!",
};
