import { JSX } from "react";
import { Hero } from "../components/Hero";
import { useDispatch } from "react-redux";
import { Film, SortPayload, TableHeadings } from "../models/types";
import { sortFilms } from "../store/filmsSlice";
import {
  NavLink,
  PageContainer,
  PageTitle,
  StyledTable,
  StyledTH,
} from "../shared/styles/styles";
import { getSortDirection, getSortIcon } from "../utils/tableUtils";
import { ReactComponent as SortDirection } from "../assets/img/icons/sort-direction.svg";
import { useMovies } from "../shared/hooks/useMovies";
import { convertEpisodeIdToRoman } from "../utils/entityUtils";

const headings: TableHeadings<Film>[] = [
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
  const { films, sortKey, sortDirection, loading, error, createNavLink } =
    useMovies({});

  const handleSort = ({ key, sortableType }: SortPayload<Film>) => {
    dispatch(sortFilms({ key, sortableType }));
  };

  return (
    <>
      {/* <Hero /> */}

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
                  sortDirection={getSortDirection(key, sortDirection, sortKey)}
                  onClick={() => handleSort({ key, sortableType })}
                  width={width}
                >
                  {label}
                  {getSortIcon(sortableType)}
                  {getSortDirection(key, sortDirection, sortKey) && (
                    <SortDirection className="sort-direction" />
                  )}
                </StyledTH>
              ))}
            </tr>
          </thead>
          <tbody>
            {films.map(({ url, release_date, title, episode_id }) => (
              <tr key={url}>
                <td>{new Date(release_date).toLocaleDateString()}</td>
                <td>
                  <NavLink isTableLink to={createNavLink(episode_id, title)}>
                    {title}
                  </NavLink>
                </td>
                <td>Episode {convertEpisodeIdToRoman(episode_id)}</td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </PageContainer>
    </>
  );
};

export default Home;
