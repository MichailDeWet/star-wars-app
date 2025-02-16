import { ReactComponent as SortByAlpha } from "../assets/img/icons/sort-by-alpha.svg";
import { ReactComponent as SortByNumber } from "../assets/img/icons/sort-by-number.svg";
import { ReactComponent as SortByTime } from "../assets/img/icons/sort-by-time.svg";
import { Film, TSortable, TSortDirection } from "../models/types";

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

export const dateConstructor = (release_date: string): string => {
  const date = new Date(release_date);

  return date.toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export function getSortDirection<T>(
  key: keyof T,
  sortDirection: TSortDirection,
  sortKey?: keyof T
): TSortDirection | undefined {
  if (sortKey === key) {
    return sortDirection;
  }

  return undefined;
}
