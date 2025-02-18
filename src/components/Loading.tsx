import { JSX } from "react";
import styled, { useTheme } from "styled-components";
import { ILoading } from "../models/interfaces";

const LoaderContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isFullPage",
})<ILoading>`
  height: ${({ isFullPage }) => (isFullPage ? "100vh" : "unset")};
  justify-items: anchor-center;
  justify-self: center;
  align-content: center;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  span {
    margin-top: 1rem;
    color: ${({ theme }) => theme.loadingTextColor};
    display: block;
  }

  svg {
    width: 30px;
    height: 30px;
    animation: spin 2s linear infinite;

    path {
      fill: ${({ theme }) => theme.loadingIconColor};
    }
  }
`;

const Loading = ({ isFullPage = false }: ILoading): JSX.Element => {
  const { loadingIcon: LoadingIcon, pageLoadingText } = useTheme();

  return (
    <LoaderContainer isFullPage={isFullPage}>
      <LoadingIcon />
      {isFullPage && <span>Page loading... {pageLoadingText}</span>}
    </LoaderContainer>
  );
};

export default Loading;
