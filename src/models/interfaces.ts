import { ReactNode } from "react";
import { Film } from "./types";

export interface IHeroPage {
  children?: ReactNode;
  opening_crawl?: string;
  heading?: string;
  subHeading?: string;
}

export interface IUseCharacters {
  isInView?: boolean;
  film?: Film;
}
