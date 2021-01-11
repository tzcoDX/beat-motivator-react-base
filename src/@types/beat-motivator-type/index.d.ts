declare module "beat-motivator-type" {
  export type DataType = {
    version: Version;
    title: string;
    genre: string;
    artist: string;
    plays: number;
    spb: Attribute;
    spn: Attribute;
    sph: Attribute;
    spa: Attribute;
    spl: Attribute;
    date: string; // TODO: Date用の型にしたい
  };

  export type Attribute = {
    level: number;
    score: number;
    pGreat: number;
    great: number;
    missCount: number | "NO PLAY";
    clearType: ClearType;
    djLevel: DjLevel;
  };

  export type Version =
    | "1st&substream"
    | "2nd style"
    | "3rd style"
    | "4th style"
    | "5th style"
    | "6th style"
    | "7th style"
    | "8th style"
    | "9th style"
    | "10th style"
    | "IIDX RED"
    | "HAPPY SKY"
    | "DistorteD"
    | "GOLD"
    | "DJ TROOPERS"
    | "EMPRESS"
    | "SIRIUS"
    | "Resort Anthem"
    | "Lincle"
    | "tricoro"
    | "SPADA"
    | "PENDUAL"
    | "copula"
    | "SINOBUZ"
    | "CANNON BALLERS"
    | "Rootage"
    | "HEROIC VERSE"
    | "BISTROVER";

  export type ClearType =
    | "NO PLAY"
    | "FAILED"
    | "ASSIST CLEAR"
    | "EASY CLEAR"
    | "CLEAR"
    | "HARD CLEAR"
    | "EX HARD CLEAR"
    | "FULLCOMBO CLEAR";

  export type DjLevel =
    | "NO PLAY"
    | "F"
    | "E"
    | "D"
    | "C"
    | "B"
    | "A"
    | "AA"
    | "AAA";

  export type StatisticsType = {
    played: number;
    total: number;
    scoreSum: number;
    notesSum: number;
    maxMinusUnderTen: number;
    maxMinusUnderHundred: number;
    maxMinus: number;
    rate99: number;
    rate98: number;
    rate97: number;
    rate96: number;
    rate95: number;
    tripleA: number;
    doubleA: number;
    singleA: number;
  };

  export type MasterDataType = {
    version: Version;
    title: string;
    genre: string;
    artist: string;
    spb: MasterAttribute | "NO_DATA";
    spn: MasterAttribute | "NO_DATA";
    sph: MasterAttribute | "NO_DATA";
    spa: MasterAttribute | "NO_DATA";
    spl: MasterAttribute | "NO_DATA";
  };

  export type MasterAttribute = {
    level: number;
    notes: number;
    kaidenAverage: number;
    topScore: number;
  };
}
