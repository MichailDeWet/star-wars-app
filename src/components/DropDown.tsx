import { useState } from "react";
import { IDropdown } from "../models/interfaces";
import styled from "styled-components";
import { getIcon } from "../utils/tableUtils";
import { Icons } from "../models/enums";
import { CardContainer, NavLink } from "../shared/styles/styles";
import { useMovies } from "../shared/hooks/useMovies";
import {
  extractNumberFromUrl,
  getFilmById,
  getItemById,
} from "../utils/entityUtils";
import { Character, Film } from "../models/types";
import { useCharacters } from "../shared/hooks/useCharacters";
import Loading from "./Loading";

const LoadingContainer = styled.div`
  margin-bottom: 1rem;

  svg {
    width: 30px !important;
    height: 30px !important;
  }
`;

const SecondaryCardContainer = styled(CardContainer).withConfig({
  shouldForwardProp: (prop) => prop !== "offSet",
})<{ offSet: number }>`
  width: 100%;
  padding: 20px;
  border: 4px solid ${({ theme }) => theme.borderColor};
  position: relative;
  top: calc(-43px * ${({ offSet }) => offSet});
  padding: 0;
  border-top: none;
  border-radius: 0 0 20px 20px;
  box-shadow: none;
  z-index: ${({ offSet }) => 10 - offSet};
  min-height: unset;
`;

const Spacer = styled.div`
  height: 65px;
`;

const DropDownHeader = styled.h2.withConfig({
  shouldForwardProp: (prop) => prop !== "isOpen",
})<{ isOpen: boolean }>`
  padding: 0 20px 20px;
  color: ${({ theme }) => theme.headingColor};
  font-style: italic;
  cursor: pointer;

  svg {
    margin-top: 6px;
    width: 15px;
    height: 15px;
    float: right;
    transition: transform 0.5s ease;

    transform: rotate(${({ isOpen }) => (isOpen ? "-90deg" : "0deg")});

    path {
      fill: ${({ theme }) => theme.caretColor};
    }
  }
`;

const DropDownListItem = styled.div`
  padding: 0 20px;

  &:last-of-type {
    padding-bottom: 20px;
  }

  svg {
    margin-right: 8px;
  }
`;

const Dropdown = ({ films, residents }: IDropdown) => {
  const [isFilmsOpen, setIsFilmsOpen] = useState<boolean>(false);
  const [isResidentsOpen, setIsResidentsOpen] = useState<boolean>(false);

  const {
    films: allFilms,
    createNavLink: moviesNavLink,
    loading,
  } = useMovies({
    isOpen: isFilmsOpen,
  });

  const {
    characters,
    createNavLink: charactersNavLink,
    loading: charactersLoading,
  } = useCharacters({
    isInView: isResidentsOpen,
    givenCharacters: residents,
  });

  const toggleFilmsDropdown = () => {
    setIsFilmsOpen((prev) => !prev);
  };

  const toggleResidentsDropdown = () => {
    setIsResidentsOpen((prev) => !prev);
  };

  return (
    <>
      {films.length > 0 && (
        <SecondaryCardContainer offSet={1}>
          <Spacer />
          <DropDownHeader isOpen={isFilmsOpen} onClick={toggleFilmsDropdown}>
            Appears in:{getIcon(Icons.CARET)}
          </DropDownHeader>

          {isFilmsOpen &&
            films.length > 0 &&
            allFilms.length > 0 &&
            films.map((film) => {
              const id = extractNumberFromUrl(film);

              if (id === undefined) {
                return null;
              }

              const { title } = getFilmById(allFilms, id.toString()) as Film;

              return (
                <DropDownListItem key={title}>
                  {getIcon(Icons.MOVIE)}
                  <NavLink isTableLink to={moviesNavLink(id, title)}>
                    {title}
                  </NavLink>
                </DropDownListItem>
              );
            })}
          {isFilmsOpen && loading && (
            <LoadingContainer>
              <Loading />
            </LoadingContainer>
          )}
        </SecondaryCardContainer>
      )}

      {residents && residents.length > 0 && (
        // Having variable offset allows for special case planets which are not in any movies
        <SecondaryCardContainer offSet={films.length ? 2 : 1}>
          <Spacer />
          <DropDownHeader
            isOpen={isResidentsOpen}
            onClick={toggleResidentsDropdown}
          >
            Residents:{getIcon(Icons.CARET)}
          </DropDownHeader>
          {isResidentsOpen &&
            characters.length > 0 &&
            residents.map((resident) => {
              const id = extractNumberFromUrl(resident);

              if (id === undefined) {
                return null;
              }

              const item = getItemById<Character>(
                characters,
                id.toString()
              ) as Character;

              if (!item) {
                return null;
              }

              const { name } = item;

              return (
                <DropDownListItem key={name}>
                  {getIcon(Icons.PROFILE)}
                  <NavLink isTableLink to={charactersNavLink(resident, name)}>
                    {name}
                  </NavLink>
                </DropDownListItem>
              );
            })}
          {isResidentsOpen && charactersLoading && (
            <LoadingContainer>
              <Loading />
            </LoadingContainer>
          )}
        </SecondaryCardContainer>
      )}
    </>
  );
};

export default Dropdown;
