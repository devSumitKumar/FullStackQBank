import { createSlice } from '@reduxjs/toolkit';

interface ThemeState {
  darkMode: boolean;
}

// Check if user has previously set a theme preference
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia && 
  window.matchMedia('(prefers-color-scheme: dark)').matches;

const initialState: ThemeState = {
  darkMode: savedTheme ? savedTheme === 'dark' : prefersDark,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem('theme', state.darkMode ? 'dark' : 'light');
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
