import { JSX, useEffect } from "react";
import { Hero } from "../components/Hero";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { fetchFilms } from "../api/films";
import { Film, TableHeadings } from "../models/types";
import {
  fetchFilmsStart,
  fetchFilmsSuccess,
  fetchFilmsFailure,
  sortFilms,
} from "../store/filmsSlice";
import { convertEpisodeIdToRoman } from "../utils/filmUtils";
import {
  PageContainer,
  PageTitle,
  StyledTable,
  StyledTH,
} from "../shared/styles/styles";
import { getSortIcon } from "../utils/tableUtils";
import { ReactComponent as SortDirection } from "../assets/img/icons/sort-direction.svg";

const headings: TableHeadings[] = [
  {
    key: "release_date",
    label: "Release Date",
    sortableType: "time",
    width: "25%",
  },
  { key: "title", label: "Title", sortableType: "alpha", width: "50%" },
  { key: "episode_id", label: "Episode", sortableType: "number", width: "25%" },
];

const Home = (): JSX.Element => {
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

  const handleSort = (key: keyof Film) => {
    dispatch(sortFilms(key));
  };

  const getSortDirection = (key: keyof Film) => {
    if (sortKey === key) {
      return sortDirection;
    }

    return undefined;
  };

  return (
    <>
      <Hero />

      <PageContainer>
        <PageTitle>Movies</PageTitle>
        {loading && <p>Loading films...</p>}
        {error && <p>{error}</p>}
        <StyledTable>
          <thead>
            <tr>
              {headings.map(({ sortableType, key, label, width }) => (
                <StyledTH
                  key={key}
                  sortableType={sortableType}
                  sortDirection={getSortDirection(key)}
                  onClick={() => handleSort(key)}
                  width={width}
                >
                  {label}
                  {getSortIcon(sortableType)}
                  {getSortDirection(key) && (
                    <SortDirection className="sort-direction" />
                  )}
                </StyledTH>
              ))}
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
        </StyledTable>
      </PageContainer>
    </>
  );
};

export default Home;
