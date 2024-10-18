import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchCharacters, fetchCharacterById} from './charactersOperations'; // Import the async thunk
import {CharacterState, CharacterType} from './types'; // Assuming you have these types defined

const initialState: CharacterState = {
  totalClicks: 0,
  successClicks: 0,
  failedClicks: 0,
  allCharacters: [],
  randomCharacter: null,
  characterDetails: null,
  isCharacterLoading: false,
  isDetailLoading: false,
};

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    incrementSuccessClicks: (state, action: PayloadAction<number>) => {
      state.successClicks += action.payload;
      state.totalClicks += action.payload;
    },
    incrementFailedClicks: (state, action: PayloadAction<number>) => {
      state.failedClicks += action.payload;
      state.totalClicks += action.payload;
    },
    setRandomCharacter: state => {
      state.isCharacterLoading = true;
      if (state.allCharacters.length > 0) {
        const randomIndex = Math.floor(
          Math.random() * state.allCharacters.length,
        );
        state.randomCharacter = state.allCharacters[randomIndex];
        state.isCharacterLoading = false;
      }
    },
    resetCounters: state => {
      state.totalClicks = 0;
      state.successClicks = 0;
      state.failedClicks = 0;
    },
    setCharacterDetailsById: (state, action: PayloadAction<string>) => {
      state.characterDetails = null;
    },
    setCharacterByIdAsRandom: (state, action: PayloadAction<string>) => {
      state.randomCharacter = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCharacters.pending, state => {
        state.isCharacterLoading = true;
      })
      .addCase(
        fetchCharacters.fulfilled,
        (state, action: PayloadAction<CharacterType[]>) => {
          state.allCharacters = action.payload;
          const randomIndex = Math.floor(
            Math.random() * state.allCharacters.length,
          );
          state.randomCharacter = state.allCharacters[randomIndex];
          state.isCharacterLoading = false;
        },
      )
      .addCase(fetchCharacters.rejected, state => {
        state.isCharacterLoading = false;
      })
      .addCase(fetchCharacterById.pending, state => {
        state.isCharacterLoading = true;
        state.isDetailLoading = true;
      })
      .addCase(
        fetchCharacterById.fulfilled,
        (state, action: PayloadAction<CharacterType>) => {
          if (state.characterDetails === null) {
            state.characterDetails = action.payload;
            state.isCharacterLoading = false;
            state.isDetailLoading = false;
          } else if (state.randomCharacter === null) {
            state.randomCharacter = action.payload;
            state.isCharacterLoading = false;
            state.isDetailLoading = false;
          }
        },
      )
      .addCase(fetchCharacterById.rejected, state => {
        state.isCharacterLoading = false;
        state.isDetailLoading = false;
      });
  },
});

export const {
  incrementSuccessClicks,
  incrementFailedClicks,
  setRandomCharacter,
  resetCounters,
  setCharacterDetailsById,
  setCharacterByIdAsRandom,
} = charactersSlice.actions;

export default charactersSlice.reducer;
