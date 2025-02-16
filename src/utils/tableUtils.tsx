import { DefaultTheme } from "styled-components";
import { ReactComponent as SortByAlpha } from "../assets/img/icons/sort-by-alpha.svg";
import { ReactComponent as SortByNumber } from "../assets/img/icons/sort-by-number.svg";
import { ReactComponent as SortByTime } from "../assets/img/icons/sort-by-time.svg";
import { TSortable } from "../models/types";
import { IGetIconColors } from "../models/interfaces";

export const getSortIcon = (sortableType?: TSortable) => {
  switch (sortableType) {
    case "alpha":
      return <SortByAlpha />;
    case "number":
      return <SortByNumber />;
    case "time":
      return <SortByTime />;
    default:
      return null;
  }
};

export const getIconColors = ({
  theme,
  isFill,
  sortableType,
  onHover,
}: IGetIconColors): string => {
  if (isFill) {
    if (sortableType !== "time") {
      return onHover ? theme.tableHeadingHoverColor : theme.headingColor;
    }

    return "";
  }

  if (sortableType && sortableType !== "number") {
    return onHover ? theme.tableHeadingHoverColor : theme.headingColor;
  }

  return "";
};
