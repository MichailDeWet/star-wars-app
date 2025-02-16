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
