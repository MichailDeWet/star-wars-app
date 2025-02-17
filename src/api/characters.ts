import { Character } from "../models/types";

export const fetchCharacterData = async (
  urls: string[]
): Promise<Character[]> => {
  try {
    const responses = await Promise.all(
      urls.map((url) => fetch(url).then((res) => res.json()))
    );

    return responses;
  } catch (error) {
    console.error("Error fetching character data:", error);
    throw new Error("Failed to fetch character data");
  }
};
