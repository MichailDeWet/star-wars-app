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

const RoutesContainer = styled.div`
  margin-top: 92px;
  height: calc(100vh - 92px);
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
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Home />} />
            <Route path="/characters" element={<Characters />} />
            <Route path="/planets" element={<Planets />} />
          </Routes>
        </RoutesContainer>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
