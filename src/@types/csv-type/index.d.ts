declare module "csv-type" {
  export type CsvType = {
    version: string;
    title: string;
    genre: string;
    artist: string;
    plays: number;
    difficulty: DiffNumber;
    score: DiffNumber;
    pGreat: DiffNumber;
    great: DiffNumber;
    missCount: DiffNumber;
    clearType: DiffClearType;
    djLevel: DiffDjLevel;
    date: string; // TODO: Date用の型にしたい
  };

  type DiffNumber = {
    spb: number;
    spn: number;
    sph: number;
    spa: number;
    spl: number;
  };

  type DiffClearType = {
    spb: ClearType;
    spn: ClearType;
    sph: ClearType;
    spa: ClearType;
    spl: ClearType;
  };

  type DiffDjLevel = {
    spb: DjLevel;
    spn: DjLevel;
    sph: DjLevel;
    spa: DjLevel;
    spl: DjLevel;
  };

  export type Difficulty = keyof DiffNumber;

  export type ClearType =
    | "NO PLAY"
    | "FAILED"
    | "ASSIST CLEAR"
    | "EASY CLEAR"
    | "CLEAR"
    | "HARD CLEAR"
    | "EX HARD CLEAR"
    | "FULLCOMBO CLEAR";

  export type DjLevel = "F" | "E" | "D" | "C" | "B" | "A" | "AA" | "AAA";
}
