import { JSX, useMemo } from "react";
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
import { ReactComponent as ProfileIcon } from "../assets/img/icons/profile-circle.svg";
import { getIcon } from "../utils/tableUtils";

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
  const { characters, currentCharacter, sortDirection, sortKey } =
    useCharacters({});
  const { planets } = usePlanets({ character: currentCharacter });

  console.log("LOG: planets", planets);

  if (!currentCharacter) {
    return <>No Character Found</>;
  }

  const { name, homeworld, films } = currentCharacter;

  const homeWorldId = extractNumberFromUrl(homeworld)?.toString();

  const world = getItemById<Planet>(planets, homeWorldId)?.name;

  const createNavLink = () => {
    return `${PagesPaths.PLANET}/${homeWorldId}/star-wars-planet-${name
      .toLowerCase()
      .replace(/ /g, "-")}`;
  };

  return (
    <PageContainer>
      <CardContainer>
        <ProfileIcon className="profile-icon" />
        <PageTitle>{name}</PageTitle>
        <StatContainer>
          <div key="home_world">
            <LabelContainer>
              {getIcon(Icons.PLANET)}
              <p>Home World:</p>
            </LabelContainer>
            <ValueContainer>
              <NavLink isTableLink to={createNavLink()}>
                {world}
              </NavLink>
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
                {unit ?? ""}
              </ValueContainer>
            </div>
          ))}
        </StatContainer>
      </CardContainer>
    </PageContainer>
  );
};

export default CharacterDetails;
