import {RootState} from '../store';

export const selectGuesses = (state: RootState) => state.list.guesses;
