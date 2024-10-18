import {RootState} from '../store';

export const selectAllCharacters = (state: RootState) =>
  state.characters.allCharacters;
export const selectTotalClicks = (state: RootState) =>
  state.characters.totalClicks;
export const selectSuccessClicks = (state: RootState) =>
  state.characters.successClicks;
export const selectFailedClicks = (state: RootState) =>
  state.characters.failedClicks;
export const selectRandomCharacter = (state: RootState) =>
  state.characters.randomCharacter;
export const selectCharacterDetails = (state: RootState) =>
  state.characters.characterDetails;
export const selectisCharacterLoading = (state: RootState) =>
  state.characters.isCharacterLoading;
export const selectisDetailLoading = (state: RootState) =>
  state.characters.isDetailLoading;
