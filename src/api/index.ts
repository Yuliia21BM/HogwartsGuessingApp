import axios from 'axios';

const API_BASE = 'https://hp-api.onrender.com/api';

export const getAllCharacters = () => axios.get(`${API_BASE}/characters`);
export const getCharacterByID = (id: string) =>
  axios.get(`${API_BASE}/character/${id}`);
export const getHogwartsStudents = () =>
  axios.get(`${API_BASE}/characters/students`);
export const getHogwartsStaff = () => axios.get(`${API_BASE}/characters/staff`);
export const getCharactersByHouse = (houseType: string) =>
  axios.get(`${API_BASE}/characters/house/${houseType}`);
export const getAllSpells = () => axios.get(`${API_BASE}/spells`);
