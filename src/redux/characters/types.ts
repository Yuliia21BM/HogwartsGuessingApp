export interface Wand {
  wood: string;
  core: string;
  length: number | null;
}

export interface CharacterType {
  id: string;
  name: string;
  alternate_names: string[];
  species: string;
  gender: string;
  house: string;
  dateOfBirth: string | null;
  yearOfBirth: number | null;
  wizard: boolean;
  ancestry: string;
  eyeColour: string;
  hairColour: string;
  wand: Wand;
  patronus: string;
  hogwartsStudent: boolean;
  hogwartsStaff: boolean;
  actor: string;
  alternate_actors: string[];
  alive: boolean;
  image: string;
}

export interface CharacterState {
  totalClicks: number;
  successClicks: number;
  failedClicks: number;
  allCharacters: CharacterType[];
  randomCharacter: CharacterType | null;
  characterDetails: CharacterType | null;
  isCharacterLoading: boolean;
  isDetailLoading: boolean;
}
