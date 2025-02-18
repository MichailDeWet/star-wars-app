import { JSX } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PagesPaths } from "../models/enums";
import styled from "styled-components";
import { ReactComponent as Arrow } from "../assets/img/icons/back-button.svg";

const StyledBackButton = styled.div`
  position: fixed;
  left: 1rem;
  bottom: 1rem;
  z-index: 10;
  cursor: pointer;
  transition: transform 0.3s ease, fill 0.3s ease;
  animation: wobble 10s infinite ease-in-out;

  &:hover {
    transform: scale(1.1) !important;

    svg {
      fill: ${({ theme }) => theme.backButtonHover};
    }
  }

  svg {
    height: 45px;
    width: 45px;
    fill: ${({ theme }) => theme.backButton};
  }

  @keyframes wobble {
    0%,
    8% {
      transform: rotate(0deg);
    }
    2% {
      transform: rotate(-10deg);
    }
    4% {
      transform: rotate(10deg);
    }
    6% {
      transform: rotate(-10deg);
    }
  }
`;

const BackButton = (): JSX.Element => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  if (pathname === PagesPaths.HOME) {
    return <></>;
  }

  return (
    <StyledBackButton onClick={() => navigate(-1)}>
      <Arrow />
    </StyledBackButton>
  );
};

export default BackButton;
