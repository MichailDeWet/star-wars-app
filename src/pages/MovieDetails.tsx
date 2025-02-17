import { JSX, useMemo } from "react";
import { useParams } from "react-router-dom";
import {
  convertEpisodeIdToRoman,
  getFilmById,
  extractNumberFromUrl,
} from "../utils/entityUtils";
import { useMovies } from "../shared/hooks/useMovies";
import {
  NavLink,
  PageContainer,
  PageTitle,
  StyledTable,
  StyledTH,
} from "../shared/styles/styles";
import { useDispatch } from "react-redux";
import { sortCharacters } from "../store/charactersSlice";
import {
  dateConstructor,
  getSortDirection,
  getSortIcon,
} from "../utils/tableUtils";
import { Hero } from "../components/Hero";
import styled from "styled-components";
import { useObserveElement } from "../shared/hooks/useObserveElement";
import { Character, SortPayload, TableHeadings } from "../models/types";
import { ReactComponent as SortDirection } from "../assets/img/icons/sort-direction.svg";
import { PagesPaths } from "../models/enums";
import { useCharacters } from "../shared/hooks/useCharacters";

export const DetailContainer = styled.div<{ fullWidth?: boolean }>`
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "350px")};
  padding: 20px;
  border: 4px solid ${({ theme }) => theme.headingColor};
  border-radius: 8px;
  text-align: center;
  color: ${({ theme }) => theme.headingColor};
  background-color: ${({ theme }) => theme.background};

  h1 {
    margin-bottom: 1rem;
  }

  span {
    font-weight: bold;
  }
`;

const headings: TableHeadings<Character>[] = [
  {
    key: "birth_year",
    label: "Birth Year",
    sortableType: "time",
    width: "25%",
  },
  {
    key: "name",
    label: "Name",
    sortableType: "alpha",
    width: "50%",
  },
  { key: "gender", label: "Gender", sortableType: "alpha", width: "25%" },
];

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

  const { isInView, elementRef } = useObserveElement();
  const { characters, sortDirection, sortKey } = useCharacters({
    isInView,
    film,
  });

  const dispatch = useDispatch();

  const handleSort = ({ key, sortableType }: SortPayload<Character>) => {
    dispatch(sortCharacters({ key, sortableType }));
  };

  const createNavLink = (url: string, name: string) => {
    return `${PagesPaths.CHARACTERS}/${extractNumberFromUrl(
      url
    )}/star-wars-character-${name.toLowerCase().replace(/ /g, "-")}`;
  };

  if (!film) {
    return <div>Movie Not Found</div>;
  }

  const { title, director, producer, release_date, opening_crawl } = film;

  return (
    <>
      <Hero
        opening_crawl={opening_crawl}
        heading={`Episode ${convertEpisodeIdToRoman(Number(episode_id))}`}
        subHeading={title}
      >
        <PageContainer>
          <DetailContainer>
            <h1>{title}</h1>
            <p>
              Directed by <span>{director}</span>
            </p>
            <p>{dateConstructor(release_date)}</p>
            <p>
              Produced by <span>{producer}</span>
            </p>
          </DetailContainer>
        </PageContainer>
      </Hero>

      <PageContainer>
        <PageTitle ref={elementRef}>Cast</PageTitle>
        {characters.length > 0 && (
          <StyledTable>
            <thead>
              <tr>
                {headings.map(({ sortableType, key, label, width }) => (
                  <StyledTH
                    key={key}
                    sortableType={sortableType}
                    sortDirection={getSortDirection(
                      key,
                      sortDirection,
                      sortKey
                    )}
                    onClick={() => handleSort({ key, sortableType })}
                    width={width}
                  >
                    {label}
                    {getSortIcon(sortableType)}
                    {getSortDirection<Character>(
                      key,
                      sortDirection,
                      sortKey
                    ) && <SortDirection className="sort-direction" />}
                  </StyledTH>
                ))}
              </tr>
            </thead>
            <tbody>
              {characters.map(({ url, name, birth_year, gender }) => {
                return (
                  <tr key={url}>
                    <td>{birth_year}</td>
                    <td>
                      <NavLink isTableLink to={createNavLink(url, name)}>
                        {name}
                      </NavLink>
                    </td>
                    <td>{gender}</td>
                  </tr>
                );
              })}
            </tbody>
          </StyledTable>
        )}
      </PageContainer>
    </>
  );
};

export default MovieDetailsPage;
