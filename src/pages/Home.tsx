import { JSX } from "react";
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
import Loading from "../components/Loading";

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
    <PageContainer>
      <PageTitle>Movies</PageTitle>
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
          {loading && (
            <tr>
              <td />
              <td>
                <Loading />
              </td>
              <td />
            </tr>
          )}
        </tbody>
      </StyledTable>
    </PageContainer>
  );
};

export default Home;
