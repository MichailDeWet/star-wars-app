import { DataEndpoints } from "../models/enums";
import { Film } from "../models/types";

const apiUrl = process.env.REACT_APP_SWAPI_URL;

export const fetchFilms = async (): Promise<Film[]> => {
  try {
    const response = await fetch(`${apiUrl}${DataEndpoints.FILMS}`);
    const data = await response.json();

    return data.results;
  } catch (error) {
    console.error("Error fetching films:", error);

    return [];
  }
};
