import { DefaultTheme } from "styled-components";
import { TSortable } from "./types";

export interface IGetIconColors {
  theme: DefaultTheme;
  isFill: boolean;
  onHover: boolean;
  sortableType?: TSortable;
}
