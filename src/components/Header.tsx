import styled, { useTheme } from "styled-components";
import { useDispatch } from "react-redux";
import { toggleTheme } from "../store/themeSlice";
import { ReactComponent as Logo } from "../assets/img/logos/star-wars-logo.svg";
import { JSX } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PagesPaths } from "../models/enums";

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

const Nav = styled.nav`
  display: flex;
  gap: 20px;
`;

const NavLink = styled(Link)`
  font-size: ${({ theme }) => theme.headerLinkSize};
  color: ${({ theme }) => theme.linkColor};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
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

  return (
    <HeaderContainer>
      <StyledLogo onClick={handleLogoClick} />
      <Nav>
        <NavLink to={PagesPaths.HOME}>Home</NavLink>
        <NavLink to={PagesPaths.CHARACTERS}>Characters</NavLink>
        <NavLink to={PagesPaths.PLANETS}>Planets</NavLink>
      </Nav>
      <ThemeToggleButton onClick={handleThemeToggle}>
        <ToggleIcon />
      </ThemeToggleButton>
    </HeaderContainer>
  );
};

export default Header;
