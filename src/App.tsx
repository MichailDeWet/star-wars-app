import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./theme/theme";
import { GlobalStyles } from "./theme/globalStyles";
import { JSX } from "react";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { PagesPaths } from "./models/enums";
import MovieDetails from "./pages/MovieDetails";
import Planet from "./pages/Planet";
import CharacterDetails from "./pages/CharacterDetails";

const RoutesContainer = styled.div`
  margin-top: ${({ theme }) => theme.headerHeight};
`;

const App = (): JSX.Element => {
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <BrowserRouter>
        <GlobalStyles />
        <Header />
        <RoutesContainer>
          <Routes>
            <Route path={PagesPaths.HOME} element={<Home />} />
            <Route path={PagesPaths.WILDCARD} element={<Home />} />
            <Route
              path={`${PagesPaths.CHARACTERS}/:character_id/:trail`}
              element={<CharacterDetails />}
            />
            <Route
              path={`${PagesPaths.PLANET}/:planet_id/:trail`}
              element={<Planet />}
            />
            <Route
              path={`${PagesPaths.MOVIE}/:episode_id/:trail`}
              element={<MovieDetails />}
            />
          </Routes>
        </RoutesContainer>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
