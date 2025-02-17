import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilms } from "../../api/films";
import {
  fetchFilmsStart,
  fetchFilmsSuccess,
  fetchFilmsFailure,
} from "../../store/filmsSlice";
import { RootState } from "../../store/store";
import { IUseMovies } from "../../models/interfaces";
import { PagesPaths } from "../../models/enums";
import { convertEpisodeIdToRoman } from "../../utils/entityUtils";

export const useMovies = ({ isOpen = true }: IUseMovies) => {
  const dispatch = useDispatch();
  const { films, sortKey, sortDirection, loading, error } = useSelector(
    (state: RootState) => state.films
  );

  const getFilms = async (): Promise<void> => {
    dispatch(fetchFilmsStart());

    try {
      const filmsData = await fetchFilms();
      dispatch(fetchFilmsSuccess(filmsData));
    } catch (_error) {
      dispatch(fetchFilmsFailure("Error fetching films"));
    }
  };

  const createNavLink = (episodeId: number, title: string) => {
    return `${
      PagesPaths.MOVIE
    }/${episodeId}/star-wars-episode-${convertEpisodeIdToRoman(
      episodeId
    )}-${title.toLowerCase().replace(/ /g, "-")}`;
  };

  useEffect(() => {
    if (!films.length && !loading && !error && isOpen) {
      getFilms();
    }
  }, [isOpen]);

  return {
    films,
    sortKey,
    sortDirection,
    loading,
    error,
    createNavLink,
  };
};
