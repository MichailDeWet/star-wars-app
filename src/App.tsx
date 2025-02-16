import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./theme/theme";
import { GlobalStyles } from "./theme/globalStyles";
import { JSX } from "react";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Characters from "./pages/Characters";
import Home from "./pages/Home";
import Planets from "./pages/Planets";
import { PagesPaths } from "./types/PagesPaths";

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
            <Route path={PagesPaths.CHARACTERS} element={<Characters />} />
            <Route path={PagesPaths.PLANETS} element={<Planets />} />
          </Routes>
        </RoutesContainer>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
