import { Character } from "../models/types";

export const extractNumberFromUrl = (url: string): number | undefined => {
  const match = RegExp(/\/(\d+)\/?$/).exec(url);

  if (match) {
    return parseInt(match[1], 10);
  }

  return undefined;
};

export const getCharacterById = (
  characters: Character[],
  id?: string
): Character | undefined => {
  if (!characters || !id) {
    return undefined;
  }

  return characters.find(({ url }) => url.endsWith(`/${id}/`));
};
