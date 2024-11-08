import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {GuessRecord, ListState} from './types';

const initialState: ListState = {
  guesses: [],
};

const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    addGuess: (state, action: PayloadAction<GuessRecord>) => {
      const existingRecord = state.guesses.find(
        guess => guess.characterId === action.payload.characterId,
      );

      if (existingRecord) {
        existingRecord.attempts += 1;
        existingRecord.success = action.payload.success;
      } else {
        state.guesses = [...state.guesses, action.payload]
      }
    },
    resetGuesses: state => {
      state.guesses = [];
    },
  },
});

export const {addGuess, resetGuesses} = listSlice.actions;
export default listSlice.reducer;
