// 小数の比較怪しい気がするから下駄履かせる
const ERROR_GETA = 10e-6;

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
  missCount: number;
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
  spb: MasterAttribute;
  spn: MasterAttribute;
  sph: MasterAttribute;
  spa: MasterAttribute;
  spl: MasterAttribute;
};

export type MasterAttribute = {
  level: number;
  notes: number;
  kaidenAverage: number;
  topScore: number;
};

const isNoPlay = (diffData: Attribute) => diffData.level < 0;
const isNoData = (diffData: MasterAttribute) => diffData.level < 0;

export const useDataHandler = () => {
  const parseData = (csvElements: string): DataType[] => {
    const getNoPlay = (): Attribute => ({
      level: -1,
      score: -1,
      pGreat: -1,
      great: -1,
      missCount: -1,
      clearType: "NO PLAY",
      djLevel: "NO PLAY",
    });
    return csvElements
      .trimEnd()
      .split("\n")
      .filter((_, idx) => idx > 0)
      .map((row) => row.split(","))
      .map((element) => {
        return {
          version: element[0] as Version,
          // ""が入ってると処理が怪しいので消す
          // TODO: 正規表現の方がよさそう
          title: element[1].replaceAll('"', ""),
          genre: element[2].replaceAll('"', ""),
          artist: element[3].replaceAll('"', ""),
          plays: parseInt(element[4]),
          spb:
            parseInt(element[6]) > 0
              ? {
                  level: parseInt(element[5]),
                  score: parseInt(element[6]),
                  pGreat: parseInt(element[7]),
                  great: parseInt(element[8]),
                  missCount: parseInt(element[9]),
                  clearType: element[10] as ClearType,
                  djLevel: element[11] as DjLevel,
                }
              : getNoPlay(),
          spn:
            parseInt(element[13]) > 0
              ? {
                  level: parseInt(element[12]),
                  score: parseInt(element[13]),
                  pGreat: parseInt(element[14]),
                  great: parseInt(element[15]),
                  missCount: parseInt(element[16]),
                  clearType: element[17] as ClearType,
                  djLevel: element[18] as DjLevel,
                }
              : getNoPlay(),
          sph:
            parseInt(element[20]) > 0
              ? {
                  level: parseInt(element[19]),
                  score: parseInt(element[20]),
                  pGreat: parseInt(element[21]),
                  great: parseInt(element[22]),
                  missCount: parseInt(element[23]),
                  clearType: element[24] as ClearType,
                  djLevel: element[25] as DjLevel,
                }
              : getNoPlay(),
          spa:
            parseInt(element[27]) > 0
              ? {
                  level: parseInt(element[26]),
                  score: parseInt(element[27]),
                  pGreat: parseInt(element[28]),
                  great: parseInt(element[29]),
                  missCount: parseInt(element[30]),
                  clearType: element[31] as ClearType,
                  djLevel: element[32] as DjLevel,
                }
              : getNoPlay(),
          spl:
            parseInt(element[34]) > 0
              ? {
                  level: parseInt(element[33]),
                  score: parseInt(element[34]),
                  pGreat: parseInt(element[35]),
                  great: parseInt(element[36]),
                  missCount: parseInt(element[37]),
                  clearType: element[38] as ClearType,
                  djLevel: element[39] as DjLevel,
                }
              : getNoPlay(),
          date: element[40],
        };
      });
  };

  const parseMasterData = (csvElement: string): MasterDataType[] => {
    // TODO: JS力が足りない
    const parsed = csvElement
      .trimEnd()
      .split("\n")
      .filter((_, idx) => idx > 0)
      .map((row) => row.split(","));
    const getNoData = (): MasterAttribute => ({
      level: -1,
      notes: -1,
      kaidenAverage: -1,
      topScore: -1,
    });
    let ret: MasterDataType[] = [];
    let tmp: MasterDataType = {
      version: "1st&substream",
      title: "",
      genre: "",
      artist: "",
      spb: getNoData(),
      spn: getNoData(),
      sph: getNoData(),
      spa: getNoData(),
      spl: getNoData(),
    };
    // TODO: csvの順番がぐちゃぐちゃでも正しくparseできるようにしたい
    parsed.forEach((val, idx) => {
      switch (idx % 5) {
        case 0:
          tmp.version = val[0] as Version;
          // ""が入ってると処理が怪しいので消す
          // TODO: 正規表現の方がよさそう
          tmp.title = val[1].replaceAll('"', "");
          tmp.genre = val[2].replaceAll('"', "");
          tmp.artist = val[3].replaceAll('"', "");
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
            spb: getNoData(),
            spn: getNoData(),
            sph: getNoData(),
            spa: getNoData(),
            spl: getNoData(),
          };
          break;
        default:
          console.error("alien world");
      }
    });

    return ret;
  };

  const calcStatistics = (
    data: DataType[],
    master: MasterDataType[]
  ): StatisticsType[] => {
    let ret = new Array<StatisticsType>(12)
      .fill({
        played: 0,
        total: 0,
        scoreSum: 0,
        notesSum: 0,
        maxMinusUnderTen: 0,
        maxMinusUnderHundred: 0,
        maxMinus: 0,
        rate99: 0,
        rate98: 0,
        rate97: 0,
        rate96: 0,
        rate95: 0,
        tripleA: 0,
        doubleA: 0,
        singleA: 0,
      })
      .map(() => ({
        played: 0,
        total: 0,
        scoreSum: 0,
        notesSum: 0,
        maxMinusUnderTen: 0,
        maxMinusUnderHundred: 0,
        maxMinus: 0,
        rate99: 0,
        rate98: 0,
        rate97: 0,
        rate96: 0,
        rate95: 0,
        tripleA: 0,
        doubleA: 0,
        singleA: 0,
      }));
    // TODO: ここらへんもreduceとかでもっといい感じにかけないかな
    data.forEach((valData) => {
      const valMaster = master.find(
        (val) =>
          valData.version === val.version &&
          valData.title === val.title &&
          valData.genre === val.genre &&
          valData.artist === val.artist
      );
      if (!valMaster) {
        // TODO: 曲データが見つかりませんでした的な警告表示したい
        console.warn(`music data "${valData.title}" is not found`);
        return;
      }
      ["spb", "spn", "sph", "spa", "spl"].forEach((val) => {
        const key = val as "spb" | "spn" | "sph" | "spa" | "spl";
        if (isNoData(valMaster[key])) return;
        const idx = valMaster[key].level - 1;
        ret[idx].total += 1;
        if (isNoPlay(valData[key])) return;
        const rate =
          valData[key].score / (valMaster[key].notes * 2) + ERROR_GETA;
        const scoreMaxMinus = valMaster[key].notes * 2 - valData[key].score;
        ret[idx].played += 1;
        ret[idx].scoreSum += valData[key].score;
        ret[idx].notesSum += valMaster[key].notes;
        if (scoreMaxMinus < 10) ret[idx].maxMinusUnderTen++;
        if (scoreMaxMinus < 100) ret[idx].maxMinusUnderHundred++;
        if (rate > 17.0 / 18.0) ret[idx].maxMinus++;
        if (rate >= 0.99) ret[idx].rate99++;
        if (rate >= 0.98) ret[idx].rate98++;
        if (rate >= 0.97) ret[idx].rate97++;
        if (rate >= 0.96) ret[idx].rate96++;
        if (rate >= 0.95) ret[idx].rate95++;
        if (rate >= 8.0 / 9.0) ret[idx].tripleA++;
        if (rate >= 7.0 / 9.0) ret[idx].doubleA++;
        if (rate >= 6.0 / 9.0) ret[idx].singleA++;
      });
    });
    return ret;
  };

  return { parseData, parseMasterData, calcStatistics };
};
