import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "./store/themeSlice";
import { RootState } from "./store/store";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./theme/theme";
import { GlobalStyles } from "./theme/globalStyles";
import { JSX } from "react";
import { Hero } from "./pages/Hero";

const App: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <button onClick={() => dispatch(toggleTheme())}>Toggle Theme</button>
      <Hero />
    </ThemeProvider>
  );
};

export default App;
