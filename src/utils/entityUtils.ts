import { Film } from "../models/types";

export const convertEpisodeIdToRoman = (episodeId: number): string => {
  switch (episodeId) {
    case 1:
      return "I";
    case 2:
      return "II";
    case 3:
      return "III";
    case 4:
      return "IV";
    case 5:
      return "V";
    case 6:
      return "VI";
    default:
      return "";
  }
};

export const getFilmById = (films: Film[], id?: string): Film | undefined => {
  if (!films || !id) {
    return undefined;
  }

  return films.find(({ episode_id }) => episode_id === Number(id));
};

export const extractNumberFromUrl = (url: string): number | undefined => {
  const match = RegExp(/\/(\d+)\/?$/).exec(url);

  if (match) {
    return parseInt(match[1], 10);
  }

  return undefined;
};

export const getItemById = <T extends { url: string }>(
  items: T[],
  id?: string
): T | undefined => {
  if (!items || !id) {
    return undefined;
  }

  return items.find(({ url }) => url.endsWith(`/${id}/`));
};

export const formatNumber = (num: number): string => {
  if (num >= 1_000_000_000_000) {
    return (num / 1_000_000_000).toFixed(1).replace(".0", "") + "T";
  } else if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1).replace(".0", "") + "B";
  } else if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(".0", "") + "M";
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(".0", "") + "K";
  } else {
    return num.toString();
  }
};
