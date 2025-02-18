import { JSX } from "react";
import {
  CardContainer,
  LabelContainer,
  PageContainer,
  PageTitle,
  StatContainer,
  ValueContainer,
} from "../shared/styles/styles";
import { usePlanets } from "../shared/hooks/usePlanets";
import { CardDetails, Planet } from "../models/types";
import { Icons } from "../models/enums";
import { getIcon } from "../utils/tableUtils";
import { formatNumber } from "../utils/entityUtils";
import Dropdown from "../components/DropDown";
import ErrorMessage from "../components/ErrorMessage";
import Loading from "../components/Loading";

const cardDetails: CardDetails<Planet>[] = [
  {
    icon: getIcon(Icons.ROTATION),
    title: "Rotational Period:",
    key: "rotation_period",
    unit: "h",
  },
  {
    icon: getIcon(Icons.ORBIT),
    title: "Orbital Period:",
    key: "orbital_period",
    unit: "d",
  },
  {
    icon: getIcon(Icons.COMPASS),
    title: "Planet Diameter:",
    key: "diameter",
    unit: "km",
  },
  { icon: getIcon(Icons.THERMOMETER), title: "Climate:", key: "climate" },
  {
    icon: getIcon(Icons.GRAVITY),
    title: "Gravity:",
    key: "gravity",
    unit: " G",
  },
  { icon: getIcon(Icons.TERRAIN), title: "Terrain Type:", key: "terrain" },
  {
    icon: getIcon(Icons.WATER),
    title: "Surface Water:",
    key: "surface_water",
    unit: "%",
  },
  {
    icon: getIcon(Icons.POPULATION),
    title: "Total Population:",
    key: "population",
  },
];

const PlanetDetails = (): JSX.Element => {
  const { currentPlanet, loading, error } = usePlanets({});

  if (loading) {
    return <Loading isFullPage />;
  }

  if (!currentPlanet || error) {
    return <ErrorMessage message="No Planet Found" />;
  }

  const { name, residents, films } = currentPlanet;

  return (
    <PageContainer>
      <CardContainer>
        {getIcon(Icons.PLANET, true)}
        <PageTitle>{name}</PageTitle>
        <StatContainer>
          {cardDetails.map(({ icon, title, key, unit }) => (
            <div key={key}>
              <LabelContainer>
                {icon}
                <p>{title}</p>
              </LabelContainer>
              <ValueContainer>
                {key === "population" && currentPlanet[key] !== "unknown"
                  ? formatNumber(Number(currentPlanet[key]))
                  : currentPlanet[key]}
                {(currentPlanet[key] !== "unknown" && unit) ?? ""}
              </ValueContainer>
            </div>
          ))}
        </StatContainer>
      </CardContainer>

      <Dropdown films={films} residents={residents} />
    </PageContainer>
  );
};

export default PlanetDetails;
