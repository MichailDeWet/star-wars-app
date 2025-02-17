import { ReactNode } from "react";
import { Character, Film } from "./types";

export interface IHeroPage {
  children: ReactNode;
  opening_crawl: string;
  heading: string;
  subHeading: string;
}

export interface IUseCharacters {
  isInView?: boolean;
  film?: Film;
}

export interface IUsePlanets {
  character?: Character;
}

export interface IUseMovies {
  isOpen?: boolean;
}

export interface IDropdown {
  films: string[];
}
