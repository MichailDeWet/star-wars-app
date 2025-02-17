import { JSX } from "react";
import { useCharacters } from "../shared/hooks/useCharacters";
import { PageContainer, PageTitle } from "../shared/styles/styles";
import { DetailContainer } from "./MovieDetails";

export type Character = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  url: string;
};

const Character = (): JSX.Element => {
  const { characters, currentCharacter, sortDirection, sortKey } =
    useCharacters({});

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

  return (
    <PageContainer>
      <DetailContainer fullWidth>
        <PageTitle>Character Card: {name}</PageTitle>
        <p>Born In: {birth_year}</p>
        <p>Height: {height}</p>
        <p>Mass: {mass}</p>
        <p>Hair Color: {hair_color}</p>
        <p>Skin Color: {skin_color}</p>
        <p>Eye Color: {eye_color}</p>
        <p>Gender: {gender}</p>
        {/* <p>Height: {homeworld}</p> */}
      </DetailContainer>
    </PageContainer>
  );
};

export default Character;
