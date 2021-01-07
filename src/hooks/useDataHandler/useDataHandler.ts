import { DataType, Version, ClearType, DjLevel } from "data-type";

export const useDataHandler = () => {
  const parseData = (csvElements: string[][]): Partial<DataType>[] =>
    csvElements.map((element) => ({
      version: element[0] as Version,
      title: element[1],
      genre: element[2],
      artist: element[3],
      plays: parseInt(element[4]),
      spb: {
        difficulty: parseInt(element[5]),
        score: parseInt(element[6]),
        pGreat: parseInt(element[7]),
        great: parseInt(element[8]),
        missCount: parseMissCount(element[9]),
        clearType: element[10] as ClearType,
        djLevel: parseDjLevel(element[11]),
      },
      spn: {
        difficulty: parseInt(element[12]),
        score: parseInt(element[13]),
        pGreat: parseInt(element[14]),
        great: parseInt(element[15]),
        missCount: parseMissCount(element[16]),
        clearType: element[17] as ClearType,
        djLevel: parseDjLevel(element[18]),
      },
      sph: {
        difficulty: parseInt(element[19]),
        score: parseInt(element[20]),
        pGreat: parseInt(element[21]),
        great: parseInt(element[22]),
        missCount: parseMissCount(element[23]),
        clearType: element[24] as ClearType,
        djLevel: parseDjLevel(element[25]),
      },
      spa: {
        difficulty: parseInt(element[26]),
        score: parseInt(element[27]),
        pGreat: parseInt(element[28]),
        great: parseInt(element[29]),
        missCount: parseMissCount(element[30]),
        clearType: element[31] as ClearType,
        djLevel: parseDjLevel(element[32]),
      },
      spl: {
        difficulty: parseInt(element[33]),
        score: parseInt(element[34]),
        pGreat: parseInt(element[35]),
        great: parseInt(element[36]),
        missCount: parseMissCount(element[37]),
        clearType: element[38] as ClearType,
        djLevel: parseDjLevel(element[39]),
      },
      date: element[40],
    }));

  return { parseData };
};

const parseMissCount = (missCount: string): number | "NO PLAY" =>
  missCount === "---" ? "NO PLAY" : parseInt(missCount);

const parseDjLevel = (djLevel: string): DjLevel =>
  djLevel === "---" ? "NO PLAY" : (djLevel as DjLevel);
