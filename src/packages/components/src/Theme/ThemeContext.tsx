import React, { useState, createContext, useEffect } from "react";
import StorageProvider from "../../../framework/src/StorageProvider.web";

export const ThemeContext = createContext({
  mode: false,
  setTheme: () => {},
});

const ThemeProvider = ({ children }: any) => {
  const [mode, setTheme] = useState(false);
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (count) {
      StorageProvider.set("mode", mode);
    } else setCount(1);
  }, [mode]);
  useEffect(() => {
    getMode();
  }, []);
  const getMode = async () => {
    const mode = await StorageProvider.get("mode");
    setTheme(mode);
  };
  const handleThemeChange = () => {
    setTheme((prevState) => !prevState);
  };
  return (
    <ThemeContext.Provider
      value={{
        mode,
        setTheme: handleThemeChange,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
