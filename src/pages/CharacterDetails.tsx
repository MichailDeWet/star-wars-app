import { JSX } from "react";
import { useCharacters } from "../shared/hooks/useCharacters";
import {
  CardContainer,
  LabelContainer,
  NavLink,
  PageContainer,
  PageTitle,
  StatContainer,
  ValueContainer,
} from "../shared/styles/styles";
import { usePlanets } from "../shared/hooks/usePlanets";
import { CardDetails, Character, Planet } from "../models/types";
import { extractNumberFromUrl, getItemById } from "../utils/entityUtils";
import { Icons, PagesPaths } from "../models/enums";
import { getIcon } from "../utils/tableUtils";
import Dropdown from "../components/DropDown";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

const cardDetails: CardDetails<Character>[] = [
  { icon: getIcon(Icons.CALENDAR), title: "Born In:", key: "birth_year" },
  { icon: getIcon(Icons.HEIGHT), title: "Height:", key: "height", unit: "cm" },
  { icon: getIcon(Icons.MASS), title: "Mass:", key: "mass", unit: "kg" },
  { icon: getIcon(Icons.HAIR), title: "Hair Color:", key: "hair_color" },
  { icon: getIcon(Icons.HAND), title: "Skin Color:", key: "skin_color" },
  { icon: getIcon(Icons.EYE), title: "Eye Color:", key: "eye_color" },
  { icon: getIcon(Icons.GENDER), title: "Gender:", key: "gender" },
];

const CharacterDetails = (): JSX.Element => {
  const { currentCharacter, loading, error } = useCharacters({});
  const { planets, loading: planetsLoading } = usePlanets({
    character: currentCharacter,
  });

  if (loading) {
    return <Loading isFullPage />;
  }
  if (!currentCharacter || error) {
    return <ErrorMessage message="No Character Found" />;
  }

  const { name, homeworld, films } = currentCharacter;

  const homeWorldId = extractNumberFromUrl(homeworld)?.toString();
  const world = getItemById<Planet>(planets, homeWorldId)?.name;

  const createNavLink = () => {
    if (!world) {
      return PagesPaths.HOME;
    }

    return `${PagesPaths.PLANET}/${homeWorldId}/star-wars-planet-${world
      .toLowerCase()
      .replace(/ /g, "-")}`;
  };

  return (
    <PageContainer>
      <CardContainer>
        {getIcon(Icons.PROFILE, true)}
        <PageTitle>{name}</PageTitle>
        <StatContainer>
          <div key="home_world">
            <LabelContainer>
              {getIcon(Icons.PLANET)}
              <p>Home World:</p>
            </LabelContainer>
            <ValueContainer>
              {planetsLoading && <Loading />}
              {world === "unknown" ? (
                world
              ) : (
                <NavLink isTableLink to={createNavLink()}>
                  {world}
                </NavLink>
              )}
            </ValueContainer>
          </div>

          {cardDetails.map(({ icon, title, key, unit }) => (
            <div key={key}>
              <LabelContainer>
                {icon}
                <p>{title}</p>
              </LabelContainer>
              <ValueContainer>
                {currentCharacter[key]}
                {(currentCharacter[key] !== "unknown" && unit) ?? ""}
              </ValueContainer>
            </div>
          ))}
        </StatContainer>
      </CardContainer>

      <Dropdown films={films} />
    </PageContainer>
  );
};

export default CharacterDetails;
