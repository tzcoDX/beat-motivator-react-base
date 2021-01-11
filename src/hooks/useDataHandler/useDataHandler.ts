import {
  DataType,
  Version,
  ClearType,
  DjLevel,
  StatisticsType,
  MasterDataType,
  MasterAttribute,
} from "beat-motivator-type";

export const useDataHandler = () => {
  const parseData = (csvElements: string): DataType[] =>
    csvElements
      .split("\n")
      .filter((_, idx) => idx > 0)
      .map((row) => row.split(","))
      .map((element) => ({
        version: element[0] as Version,
        title: element[1],
        genre: element[2],
        artist: element[3],
        plays: parseInt(element[4]),
        spb: {
          level: parseInt(element[5]),
          score: parseInt(element[6]),
          pGreat: parseInt(element[7]),
          great: parseInt(element[8]),
          missCount: parseMissCount(element[9]),
          clearType: element[10] as ClearType,
          djLevel: parseDjLevel(element[11]),
        },
        spn: {
          level: parseInt(element[12]),
          score: parseInt(element[13]),
          pGreat: parseInt(element[14]),
          great: parseInt(element[15]),
          missCount: parseMissCount(element[16]),
          clearType: element[17] as ClearType,
          djLevel: parseDjLevel(element[18]),
        },
        sph: {
          level: parseInt(element[19]),
          score: parseInt(element[20]),
          pGreat: parseInt(element[21]),
          great: parseInt(element[22]),
          missCount: parseMissCount(element[23]),
          clearType: element[24] as ClearType,
          djLevel: parseDjLevel(element[25]),
        },
        spa: {
          level: parseInt(element[26]),
          score: parseInt(element[27]),
          pGreat: parseInt(element[28]),
          great: parseInt(element[29]),
          missCount: parseMissCount(element[30]),
          clearType: element[31] as ClearType,
          djLevel: parseDjLevel(element[32]),
        },
        spl: {
          level: parseInt(element[33]),
          score: parseInt(element[34]),
          pGreat: parseInt(element[35]),
          great: parseInt(element[36]),
          missCount: parseMissCount(element[37]),
          clearType: element[38] as ClearType,
          djLevel: parseDjLevel(element[39]),
        },
        date: element[40],
      }));

  const parseMasterData = (csvElement: string): MasterDataType[] => {
    // TODO: JS力が足りない
    const parsed = csvElement
      .split("\n")
      .filter((_, idx) => idx > 0)
      .map((row) => row.split(","));

    let ret: MasterDataType[] = [];
    let tmp: MasterDataType = {
      version: "1st&substream",
      title: "",
      genre: "",
      artist: "",
      spb: "NO_DATA",
      spn: "NO_DATA",
      sph: "NO_DATA",
      spa: "NO_DATA",
      spl: "NO_DATA",
    };
    parsed.forEach((val, idx) => {
      switch (idx % 5) {
        case 0:
          tmp.version = val[0] as Version;
          tmp.title = val[1];
          tmp.genre = val[2];
          tmp.artist = val[3];
          if (parseInt(val[7]) > 0) {
            tmp.spb = {
              level: parseInt(val[7]),
              notes: parseInt(val[8]),
              // TODO: データがないので適当にうめとく
              kaidenAverage: 0,
              topScore: 0,
            };
          }
          break;
        case 1:
          if (parseInt(val[7]) > 0) {
            tmp.spn = {
              level: parseInt(val[7]),
              notes: parseInt(val[8]),
              // TODO: データがないので適当にうめとく
              kaidenAverage: 0,
              topScore: 0,
            };
          }
          break;
        case 2:
          if (parseInt(val[7]) > 0) {
            tmp.sph = {
              level: parseInt(val[7]),
              notes: parseInt(val[8]),
              // TODO: データがないので適当にうめとく
              kaidenAverage: 0,
              topScore: 0,
            };
          }
          break;
        case 3:
          if (parseInt(val[7]) > 0) {
            tmp.spa = {
              level: parseInt(val[7]),
              notes: parseInt(val[8]),
              // TODO: データがないので適当にうめとく
              kaidenAverage: 0,
              topScore: 0,
            };
          }
          break;
        case 4:
          if (parseInt(val[7]) > 0) {
            tmp.spl = {
              level: parseInt(val[7]),
              notes: parseInt(val[8]),
              // TODO: データがないので適当にうめとく
              kaidenAverage: 0,
              topScore: 0,
            };
          }
          ret.push(tmp);
          tmp = {
            version: "1st&substream",
            title: "",
            genre: "",
            artist: "",
            spb: "NO_DATA",
            spn: "NO_DATA",
            sph: "NO_DATA",
            spa: "NO_DATA",
            spl: "NO_DATA",
          };
          break;
        default:
          console.error("alien world");
      }
    });

    return ret;
  };

  // const calcStatistics = (data: DataType[]): Partial<StatisticsType>[] => {
  //   const ret = data.reduce<Partial<StatisticsType>[]>((acc, cur) => {
  //     return {};
  //   }, new Array<StatisticsType>(12));
  //   return [];
  // };

  return { parseData, parseMasterData };
};

const parseMissCount = (missCount: string): number | "NO PLAY" =>
  missCount === "---" ? "NO PLAY" : parseInt(missCount);

const parseDjLevel = (djLevel: string): DjLevel =>
  djLevel === "---" ? "NO PLAY" : (djLevel as DjLevel);
