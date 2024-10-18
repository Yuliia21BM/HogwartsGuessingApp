import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const commonSlice = createSlice({
  name: 'common',
  initialState: {isThemeDark: true},
  reducers: {
    toggleTheme: state => {
      state.isThemeDark = !state.isThemeDark;
    },
  },
});

export const {toggleTheme} = commonSlice.actions;

export default commonSlice.reducer;
