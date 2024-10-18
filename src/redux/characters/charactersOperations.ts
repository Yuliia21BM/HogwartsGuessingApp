import {createAsyncThunk} from '@reduxjs/toolkit';
import {getAllCharacters, getCharacterByID} from '../../api'; // Replace with your API function

export const fetchCharacters = createAsyncThunk(
  'characters/fetchCharacters',
  async () => {
    const response = await getAllCharacters();
    return response.data; // Assuming the data is an array of characters
  },
);

export const fetchCharacterById = createAsyncThunk(
  'characters/fetchCharacterById',
  async (characterId: string) => {
    const response = await getCharacterByID(characterId);
    return response.data[0];
  },
);
