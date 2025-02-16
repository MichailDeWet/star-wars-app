import { JSX, useMemo } from "react";
import { useParams } from "react-router-dom";
import { getFilmById } from "../utils/filmUtils";
import { useMovies } from "../shared/hooks/useMovies";

const MovieDetailsPage = (): JSX.Element => {
  const { episode_id } = useParams<{
    episode_id: string;
    trail: string;
  }>();

  const { films } = useMovies();

  const film = useMemo(
    () => getFilmById(films, episode_id),
    [films, episode_id]
  );

  if (!film) {
    return <div>Movie Not Found</div>;
  }

  return (
    <div>
      <h1>
        Movie Details for Episode {episode_id} {film.director}
      </h1>
    </div>
  );
};

export default MovieDetailsPage;
