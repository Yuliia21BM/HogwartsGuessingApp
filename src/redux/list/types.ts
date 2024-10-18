export type GuessRecord = {
  characterId: string;
  characterName: string;
  characterImage: string;
  house: string;
  attempts: number;
  success: boolean;
  gender: string | null;
};

export interface ListState {
  guesses: GuessRecord[];
}
