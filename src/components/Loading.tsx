import { JSX } from "react";
import styled, { useTheme } from "styled-components";

const LoaderContainer = styled.div`
  justify-self: center;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
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

const Loading = (): JSX.Element => {
  const { loadingIcon: LoadingIcon } = useTheme();

  return (
    <LoaderContainer>
      <LoadingIcon />
    </LoaderContainer>
  );
};

export default Loading;
