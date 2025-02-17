import { JSX } from "react";
import { PageContainer, PageTitle } from "../shared/styles/styles";
import { DetailContainer } from "./MovieDetails";
import { usePlanets } from "../shared/hooks/usePlanets";

const Planet = (): JSX.Element => {
  const { currentPlanet } = usePlanets({});

  if (!currentPlanet) {
    return <>No Planet Found</>;
  }

  const {
    name,
    rotation_period,
    orbital_period,
    diameter,
    climate,
    gravity,
    terrain,
    surface_water,
    population,
    residents,
    films,
  } = currentPlanet;

  return (
    <PageContainer>
      <DetailContainer fullWidth>
        <PageTitle>Planet Card:{name} </PageTitle>
        <p>Rotational Period: {rotation_period}</p>
        <p>Orbital Period: {orbital_period}</p>
        <p>Planet Diameter: {diameter}</p>
        <p>Climate: {climate}</p>
        <p>Gravity: {gravity}</p>
        <p>Terrain Type: {terrain}</p>
        <p>Surface Water: {surface_water}</p>
        <p>Total Population: {population}</p>
        <p>Number of Residents: {residents}</p>
      </DetailContainer>
    </PageContainer>
  );
};

export default Planet;
