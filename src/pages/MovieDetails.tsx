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
import { TableHeadings } from "../models/types";

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

const MovieDetailsPage = (): JSX.Element => {
  const { episode_id } = useParams<{
    episode_id: string;
    trail: string;
  }>();

  const { films } = useMovies();
  const { characters } = useSelector((state: RootState) => state.characters);
  const dispatch = useDispatch();

  const { isInView, elementRef } = useObserveElement();

  const film = useMemo(
    () => getFilmById(films, episode_id),
    [films, episode_id]
  );

  useEffect(() => {
    if (isInView && !Object.keys(characters).length && film?.characters) {
      // Fetch character data only when it's opened and the data is not in Redux
      fetchCharacterData(film.characters).then((data) => {
        dispatch(setCharacters(data));
      });
    }
  }, [isInView, characters, dispatch, film?.characters]);

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
        {characters && (
          <></>
          // <ul>
          //   {film.characters.map((url) => {
          //     const character = characters[url];

          //     return character ? (
          //       <li key={url}>
          //         <h3>{character.name}</h3>
          //         <p>Height: {character.height} cm</p>
          //         <p>Mass: {character.mass} kg</p>
          //         <p>Hair Color: {character.hair_color}</p>
          //         <p>Skin Color: {character.skin_color}</p>
          //         <p>Eye Color: {character.eye_color}</p>
          //         <p>Birth Year: {character.birth_year}</p>
          //         <p>Gender: {character.gender}</p>
          //         <p>Homeworld: {character.homeworld}</p>
          //       </li>
          //     ) : null;
          //   })}
          // </ul>
          // <StyledTable>
          //   <thead>
          //     <tr>
          //       {headings.map(({ sortableType, key, label, width }) => (
          //         <StyledTH
          //           key={key}
          //           sortableType={sortableType}
          //           sortDirection={getSortDirection(
          //             key,
          //             sortKey,
          //             sortDirection
          //           )}
          //           onClick={() => handleSort(key)}
          //           width={width}
          //         >
          //           {label}
          //           {getSortIcon(sortableType)}
          //           {getSortDirection(key, sortKey, sortDirection) && (
          //             <SortDirection className="sort-direction" />
          //           )}
          //         </StyledTH>
          //       ))}
          //     </tr>
          //   </thead>
          //   <tbody>
          //     {films.map(({ url, release_date, title, episode_id }) => (
          //       <tr key={url}>
          //         <td>{new Date(release_date).toLocaleDateString()}</td>
          //         <td>
          //           <NavLink isTableLink to={createNavLink(episode_id, title)}>
          //             {title}
          //           </NavLink>
          //         </td>
          //         <td>Episode {convertEpisodeIdToRoman(episode_id)}</td>
          //       </tr>
          //     ))}
          //   </tbody>
          // </StyledTable>
        )}
      </PageContainer>
    </>
  );
};

export default MovieDetailsPage;
