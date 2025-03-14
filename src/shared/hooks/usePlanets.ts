import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { fetchEntityData } from "../../api/entity";
import { IUsePlanets } from "../../models/interfaces";
import { useParams } from "react-router-dom";
import { DataEndpoints } from "../../models/enums";
import { Planet } from "../../models/types";
import { getItemById } from "../../utils/entityUtils";
import {
  fetchPlanetsFailure,
  fetchPlanetsStart,
  fetchPlanetsSuccess,
} from "../../store/planetsSlice";

const apiUrl = process.env.REACT_APP_SWAPI_URL;

export const usePlanets = ({ character }: IUsePlanets) => {
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

    /* Just get the current planet */
    if (!currentPlanet && planet_id) {
      missingPlanetUrls = [`${apiUrl}${DataEndpoints.PLANETS}/${planet_id}`];
    }

    /* Get the home planet of a character */
    if (character) {
      missingPlanetUrls = [character.homeworld];
    }

    if (error) {
      missingPlanetUrls = missingPlanetUrls.filter((url) =>
        error.some((failed) => failed === url)
      );
    }

    if (missingPlanetUrls.length > 0) {
      dispatch(fetchPlanetsStart());

      fetchEntityData<Planet>(missingPlanetUrls)
        .then((data) => dispatch(fetchPlanetsSuccess(data)))
        .catch((_error) =>
          dispatch(fetchPlanetsFailure(["Error fetching Planets"]))
        );
    }
  }, [character, currentPlanet, dispatch, error, planet_id]);

  return {
    planets,
    currentPlanet,
    loading,
    error,
  };
};
