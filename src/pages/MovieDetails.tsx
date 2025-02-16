import { JSX, useEffect, useMemo } from "react";
import { NavLink, useParams } from "react-router-dom";
import { convertEpisodeIdToRoman, getFilmById } from "../utils/filmUtils";
import { useMovies } from "../shared/hooks/useMovies";
import {
  PageContainer,
  PageTitle,
  StyledTable,
  StyledTH,
} from "../shared/styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { fetchCharacterData } from "../api/characters";
import { setCharacters } from "../store/charactersSlice";
import {
  dateConstructor,
  getSortDirection,
  getSortIcon,
} from "../utils/tableUtils";
import { Hero } from "../components/Hero";
import styled from "styled-components";
import { useObserveElement } from "../shared/hooks/useObserveElement";
import { Character, TableHeadings } from "../models/types";
import { ReactComponent as SortDirection } from "../assets/img/icons/sort-direction.svg";

const DetailContainer = styled.div`
  width: 350px;
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
  const { characters, sortKey, sortDirection } = useSelector(
    (state: RootState) => state.characters
  );
  const dispatch = useDispatch();

  const { isInView, elementRef } = useObserveElement();

  const film = useMemo(
    () => getFilmById(films, episode_id),
    [films, episode_id]
  );

  useEffect(() => {
    if (isInView && film) {
      const missingCharacterUrls = film.characters.filter(
        (url) => !Object.keys(characters).includes(url)
      );

      if (missingCharacterUrls.length > 0) {
        fetchCharacterData(missingCharacterUrls).then((data) => {
          dispatch(setCharacters(data));
        });
      }
    }
  }, [isInView, characters, film?.characters]);

  const TableRows = useMemo(
    () =>
      Object.keys(characters).length > 0 &&
      film?.characters.map((url) => {
        const { name, birth_year, gender } = characters[url];

        return (
          <tr key={url}>
            <td>{birth_year}</td>
            <td>
              {/* <NavLink isTableLink to={createNavLink(episode_id, title)}> */}
              {name}
              {/* </NavLink> */}
            </td>
            <td>{gender}</td>
          </tr>
        );
      }),
    [characters, film?.characters]
  );

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
        {Object.keys(characters).length > 0 && (
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
                    // onClick={() => handleSort(key)}
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
            <tbody>{TableRows}</tbody>
          </StyledTable>
        )}
      </PageContainer>
    </>
  );
};

export default MovieDetailsPage;
