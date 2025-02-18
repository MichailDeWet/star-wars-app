import styled, { useTheme } from "styled-components";
import { useDispatch } from "react-redux";
import { toggleTheme } from "../store/themeSlice";
import { ReactComponent as Logo } from "../assets/img/logos/star-wars-logo.svg";
import { JSX } from "react";
import { useNavigate } from "react-router-dom";
import { DeviceSizes, PagesPaths } from "../models/enums";
import { NavLink } from "../shared/styles/styles";

const HeaderContainer = styled.header`
  width: 100%;
  height: ${({ theme }) => theme.headerHeight};
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;

  @media (max-width: ${DeviceSizes.MOBILE_MEDIUM}) {
    .randomize {
      display: none;
    }
  }
`;

const StyledLogo = styled(Logo)`
  width: 100px;
  height: auto;
  fill: transparent;
  cursor: pointer;

  transition: transform 0.3s ease;

  path {
    fill: ${({ theme }) => theme.logoColor};
  }

  &:hover {
    transform: scale(1.1);
  }
`;

const ThemeToggleButton = styled.div`
  cursor: pointer;

  svg {
    width: 35px;
    stroke: ${({ theme }) => theme.logoColor};
    fill: transparent;
    stroke-width: 0.5px;
    stroke-linejoin: round;
    transition: fill 0.3s ease;

    &:hover {
      fill: ${({ theme }) => theme.logoColor};
    }
  }
`;

const dataSet = [
  { path: PagesPaths.MOVIE, range: 6 },
  { path: PagesPaths.PLANET, range: 60 },
  { path: PagesPaths.CHARACTERS, range: 82 },
];

const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const Header = (): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { themeToggle: ToggleIcon } = useTheme();

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const handleLogoClick = () => {
    navigate(PagesPaths.HOME);
  };

  const generateRandomPath = (): string => {
    const { path, range } = dataSet[getRandomNumber(0, 2)];
    const id = getRandomNumber(1, range);

    return `${path}/${id}/star-wars-randomize`;
  };

  return (
    <HeaderContainer>
      <StyledLogo onClick={handleLogoClick} />
      <NavLink className="randomize" to={generateRandomPath()}>
        Randomize!
      </NavLink>
      <ThemeToggleButton onClick={handleThemeToggle}>
        <ToggleIcon />
      </ThemeToggleButton>
    </HeaderContainer>
  );
};

export default Header;
