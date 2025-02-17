import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilms } from "../../api/films";
import {
  fetchFilmsStart,
  fetchFilmsSuccess,
  fetchFilmsFailure,
} from "../../store/filmsSlice";
import { RootState } from "../../store/store";
import { fetchEntityData } from "../../api/entity";
import { IUsePlanets } from "../../models/interfaces";
import { useParams } from "react-router-dom";
import { DataEndpoints } from "../../models/enums";
import { Planet } from "../../models/types";
import { getItemById } from "../../utils/entityUtils";
import { fetchPlanetsSuccess } from "../../store/planetsSlice";

const apiUrl = process.env.REACT_APP_SWAPI_URL;

export const usePlanets = ({ character = undefined }: IUsePlanets) => {
  const dispatch = useDispatch();
  const { planet_id } = useParams<{
    planet_id: string;
    trail: string;
  }>();

  const { planets, loading, error } = useSelector(
    (state: RootState) => state.planets
  );

  const currentPlanet = useMemo(
    () => getItemById<Planet>(planets, planet_id),
    [planets, planet_id]
  );

  useEffect(() => {
    let missingPlanetUrls: string[] = [];

    if (!currentPlanet && planet_id) {
      missingPlanetUrls = [`${apiUrl}${DataEndpoints.PLANETS}/${planet_id}`];
    }

    if (character) {
      missingPlanetUrls = [character.homeworld];
    }

    if (missingPlanetUrls.length > 0) {
      fetchEntityData<Planet>(missingPlanetUrls).then((data) => {
        dispatch(fetchPlanetsSuccess(data));
      });
    }
  }, [character, currentPlanet, planet_id]);

  return {
    planets,
    currentPlanet,
    // sortKey,
    // sortDirection,
    loading,
    error,
  };
};
