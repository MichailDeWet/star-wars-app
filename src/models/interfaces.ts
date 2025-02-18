import { ReactNode } from "react";
import { Character } from "./types";

export interface IHeroPage {
  children: ReactNode;
  opening_crawl: string;
  heading: string;
  subHeading: string;
}

export interface IUseCharacters {
  isInView?: boolean;
  givenCharacters?: string[];
}

export interface IUsePlanets {
  character?: Character;
}

export interface IUseMovies {
  isOpen?: boolean;
}

export interface IDropdown {
  films: string[];
  residents?: string[];
}

export interface ILoading {
  isFullPage?: boolean;
}

export interface IErrorMessage {
  message: string;
}
