import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilms } from "../../api/films";
import {
  fetchFilmsStart,
  fetchFilmsSuccess,
  fetchFilmsFailure,
} from "../../store/filmsSlice";
import { RootState } from "../../store/store";

export const useMovies = () => {
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

  useEffect(() => {
    if (!films.length && !loading && !error) {
      getFilms();
    }
  }, []);

  return {
    films,
    sortKey,
    sortDirection,
    loading,
    error,
  };
};
