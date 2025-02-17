import { useState } from "react";
import { IDropdown } from "../models/interfaces";
import styled from "styled-components";
import { getIcon } from "../utils/tableUtils";
import { Icons } from "../models/enums";
import {
  CardContainer,
  LabelContainer,
  NavLink,
  ValueContainer,
} from "../shared/styles/styles";
import { useMovies } from "../shared/hooks/useMovies";
import { extractNumberFromUrl, getFilmById } from "../utils/entityUtils";
import { Film } from "../models/types";

const SecondaryCardContainer = styled(CardContainer)`
  width: 100%;
  padding: 20px;
  border: 4px solid ${({ theme }) => theme.borderColor};
  position: relative;
  top: -43px;
  padding: 0;
  border-top: none;
  border-radius: 0 0 20px 20px;
  box-shadow: none;
`;

const Spacer = styled.div`
  height: 65px;
`;

const DropDownHeader = styled.h2<{ isOpen: boolean }>`
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

const Dropdown = ({ films }: IDropdown) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { films: allFilms, createNavLink } = useMovies({ isOpen });
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <SecondaryCardContainer>
      <Spacer />
      <DropDownHeader isOpen={isOpen} onClick={toggleDropdown}>
        Appears in:{getIcon(Icons.CARET)}
      </DropDownHeader>

      {isOpen &&
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
              <NavLink isTableLink to={createNavLink(id, title)}>
                {title}
              </NavLink>
            </DropDownListItem>
          );
        })}
    </SecondaryCardContainer>
  );
};

export default Dropdown;
