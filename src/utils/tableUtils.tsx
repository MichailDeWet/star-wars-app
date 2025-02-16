import { ReactComponent as SortByAlpha } from "../assets/img/icons/sort-by-alpha.svg";
import { ReactComponent as SortByNumber } from "../assets/img/icons/sort-by-number.svg";
import { ReactComponent as SortByTime } from "../assets/img/icons/sort-by-time.svg";
import { TSortable } from "../models/types";

export const getSortIcon = (sortableType?: TSortable) => {
  switch (sortableType) {
    case "alpha":
      return <SortByAlpha className={sortableType} />;
    case "number":
      return <SortByNumber className={sortableType} />;
    case "time":
      return <SortByTime className={sortableType} />;
    default:
      return null;
  }
};
