import { ReactComponent as SortByAlpha } from "../assets/img/icons/sort-by-alpha.svg";
import { ReactComponent as SortByNumber } from "../assets/img/icons/sort-by-number.svg";
import { ReactComponent as SortByTime } from "../assets/img/icons/sort-by-time.svg";
import { ReactComponent as ProfileIcon } from "../assets/img/icons/profile-circle.svg";
import { ReactComponent as CalendarIcon } from "../assets/img/icons/calendar.svg";
import { ReactComponent as PlanetIcon } from "../assets/img/icons/planet.svg";
import { ReactComponent as HeightIcon } from "../assets/img/icons/tape-measure.svg";
import { ReactComponent as MassIcon } from "../assets/img/icons/mass.svg";
import { ReactComponent as HairIcon } from "../assets/img/icons/hair.svg";
import { ReactComponent as HandIcon } from "../assets/img/icons/hand.svg";
import { ReactComponent as EyeIcon } from "../assets/img/icons/eye.svg";
import { ReactComponent as GenderIcon } from "../assets/img/icons/gender.svg";
import { ReactComponent as RotationIcon } from "../assets/img/icons/rotation.svg";
import { ReactComponent as OrbitIcon } from "../assets/img/icons/orbit.svg";
import { ReactComponent as CompassIcon } from "../assets/img/icons/compass.svg";
import { ReactComponent as GravityIcon } from "../assets/img/icons/gravity.svg";
import { ReactComponent as WaterIcon } from "../assets/img/icons/water.svg";
import { ReactComponent as PopulationIcon } from "../assets/img/icons/population.svg";
import { ReactComponent as TerrainIcon } from "../assets/img/icons/terrain.svg";
import { ReactComponent as ThermometerIcon } from "../assets/img/icons/thermometer.svg";
import { TSortable, TSortDirection } from "../models/types";
import { Icons } from "../models/enums";

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

export const getIcon = (key: string, isMainIcon?: boolean) => {
  const className = `${key}${isMainIcon ? " main-icon" : ""}`;

  switch (key) {
    case Icons.CALENDAR:
      return <CalendarIcon className={className} />;
    case Icons.COMPASS:
      return <CompassIcon className={className} />;
    case Icons.EYE:
      return <EyeIcon className={className} />;
    case Icons.GENDER:
      return <GenderIcon className={className} />;
    case Icons.GRAVITY:
      return <GravityIcon className={className} />;
    case Icons.HAIR:
      return <HairIcon className={className} />;
    case Icons.HAND:
      return <HandIcon className={className} />;
    case Icons.HEIGHT:
      return <HeightIcon className={className} />;
    case Icons.MASS:
      return <MassIcon className={className} />;
    case Icons.ORBIT:
      return <OrbitIcon className={className} />;
    case Icons.PLANET:
      return <PlanetIcon className={className} />;
    case Icons.POPULATION:
      return <PopulationIcon className={className} />;
    case Icons.PROFILE:
      return <ProfileIcon className={className} />;
    case Icons.ROTATION:
      return <RotationIcon className={className} />;
    case Icons.TERRAIN:
      return <TerrainIcon className={className} />;
    case Icons.THERMOMETER:
      return <ThermometerIcon className={className} />;
    case Icons.WATER:
      return <WaterIcon className={className} />;
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

const starWarsTimelineSort = (
  a: string,
  b: string,
  sortDirection: TSortDirection
) => {
  if (a === "unknown" && b === "unknown") return 0;
  if (a === "unknown") return 1;
  if (b === "unknown") return -1;

  // Regular expression to match dates in the "BBY" and "ABY" format
  const matchA = /^(\d+(\.\d+)?)(BBY|ABY)$/.exec(a);
  const matchB = /^(\d+(\.\d+)?)(BBY|ABY)$/.exec(b);

  if (!matchA || !matchB) {
    return 0;
  }

  let numberPartA = parseFloat(matchA[1]);
  let numberPartB = parseFloat(matchB[1]);

  if (matchA[3] === "BBY") numberPartA = -numberPartA;
  if (matchB[3] === "BBY") numberPartB = -numberPartB;

  if (sortDirection === "asc") {
    return numberPartA - numberPartB;
  }

  return numberPartB - numberPartA;
};

export function sortItems<T>(
  items: T[],
  key: keyof T,
  sortDirection: TSortDirection,
  sortableType: TSortable
): T[] {
  return [...items].sort((a, b) => {
    if (sortableType === "time") {
      // Special Case for BBY dates
      if (key === "birth_year") {
        return starWarsTimelineSort(
          a[key] as string,
          b[key] as string,
          sortDirection
        );
      }

      const dateA = new Date(a[key] as string).getTime();
      const dateB = new Date(b[key] as string).getTime();

      if (sortDirection === "asc") {
        return dateA - dateB;
      }

      return dateB - dateA;
    }

    if (sortableType === "number") {
      if (sortDirection === "asc") {
        return (a[key] as number) - (b[key] as number);
      }

      return (b[key] as number) - (a[key] as number);
    }

    if (sortableType === "alpha") {
      if (sortDirection === "asc") {
        return (a[key] as string).localeCompare(b[key] as string);
      }

      return (b[key] as string).localeCompare(a[key] as string);
    }

    return 0;
  });
}
