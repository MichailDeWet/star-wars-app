import { JSX, useEffect } from "react";
import { Hero } from "../components/Hero";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { fetchFilms } from "../api/films";
import { Film } from "../models/types";
import {
  fetchFilmsStart,
  fetchFilmsSuccess,
  fetchFilmsFailure,
  sortFilms,
} from "../store/filmsSlice";
import { convertEpisodeIdToRoman } from "../utils/filmUtils";

const Home = (): JSX.Element => {
  const dispatch = useDispatch();
  const { films, loading, error } = useSelector(
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

  const handleSort = (key: keyof Film) => {
    dispatch(sortFilms(key));
  };

  return (
    <div>
      <Hero />
      <h1>Star Wars Movies</h1>
      {loading && <p>Loading films...</p>}
      {error && <p>{error}</p>}
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("release_date")}>Release Date</th>
            <th onClick={() => handleSort("title")}>Title</th>
            <th onClick={() => handleSort("episode_id")}>Episode</th>
          </tr>
        </thead>
        <tbody>
          {films.map((film) => (
            <tr key={film.url}>
              <td>{new Date(film.release_date).toLocaleDateString()}</td>
              <td>{film.title}</td>
              <td>Episode {convertEpisodeIdToRoman(film.episode_id)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
