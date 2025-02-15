import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "./store/themeSlice";
import { RootState } from "./store/store";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./theme/theme";
import { GlobalStyles } from "./theme/globalStyles";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <div>
        <button onClick={() => dispatch(toggleTheme())}>Toggle Theme</button>
        <h1>Star Wars App</h1>
        {/* Add other components like character list, movie details, etc. */}
      </div>
    </ThemeProvider>
  );
};

export default App;
