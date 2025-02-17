import { JSX, useMemo } from "react";
import { useCharacters } from "../shared/hooks/useCharacters";
import { NavLink, PageContainer, PageTitle } from "../shared/styles/styles";
import { DetailContainer } from "./MovieDetails";
import { usePlanets } from "../shared/hooks/usePlanets";
import { Planet } from "../models/types";
import { extractNumberFromUrl, getItemById } from "../utils/entityUtils";
import { PagesPaths } from "../models/enums";

const Character = (): JSX.Element => {
  const { characters, currentCharacter, sortDirection, sortKey } =
    useCharacters({});
  const { planets } = usePlanets({ character: currentCharacter });

  if (!currentCharacter) {
    return <>No Character Found</>;
  }

  const {
    name,
    height,
    mass,
    hair_color,
    skin_color,
    eye_color,
    birth_year,
    gender,
    homeworld,
    films,
  } = currentCharacter;

  const homeWorldId = extractNumberFromUrl(homeworld)?.toString();

  const world = getItemById<Planet>(planets, homeWorldId)?.name;

  const createNavLink = () => {
    return `${PagesPaths.PLANET}/${homeWorldId}/star-wars-planet-${name
      .toLowerCase()
      .replace(/ /g, "-")}`;
  };

  return (
    <PageContainer>
      <DetailContainer fullWidth>
        <PageTitle>Character Card: {name}</PageTitle>
        <p>Born In: {birth_year}</p>
        <p>
          Home World:
          <NavLink to={createNavLink()}>{world}</NavLink>
        </p>
        <p>Height: {height}</p>
        <p>Mass: {mass}</p>
        <p>Hair Color: {hair_color}</p>
        <p>Skin Color: {skin_color}</p>
        <p>Eye Color: {eye_color}</p>
        <p>Gender: {gender}</p>
      </DetailContainer>
    </PageContainer>
  );
};

export default Character;
