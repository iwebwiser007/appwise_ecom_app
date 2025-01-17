import React, {createContext, useState, useEffect, useContext} from 'react';
import {useColorScheme} from 'react-native';
import {colors} from '../constant/color';

export const ThemeContext = createContext();

const lightTheme = {
  background: '#F9F9F9',
  text: '#000000',
  primary: colors.primary,
  section: "#5B5A5A",
  placeholder: colors.placeholder,
  modelColor: 'rgba(0,0,0,0.4)',
  isDark: false,
  isLight: true
};

const darkTheme = {
  background: '#363434',
  text: colors.white,
  primary: colors.primary,
  section: '#5B5A5A',
  placeholder: colors.placeholder,
  modelColor: 'rgba(256,256,256,0.4)',
  isDark: true,
  isLight: false
};


export const ThemeProvider = ({children}) => {
  const systemTheme = useColorScheme();
  //const [theme, setTheme] = useState(systemTheme === 'dark' ? darkTheme : lightTheme);
  const [theme, setTheme] = useState(lightTheme);

  // useEffect(() => {
  //   setTheme(systemTheme === 'dark' ? darkTheme : lightTheme);
  // }, [systemTheme]);

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeColor = () => {
  const {theme} = useContext(ThemeContext);
  return {
    background: theme.background,
    text: theme.text,
    primary: theme.primary,
    section: theme.section,
    placeholder: theme.placeholder,
    modelColor: theme.modelColor,
    isDark: theme.isDark,
    isLight: theme.isLight,
  };
};
