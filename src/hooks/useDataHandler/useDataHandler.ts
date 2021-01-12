import {
  DataType,
  Attribute,
  Version,
  ClearType,
  DjLevel,
  StatisticsType,
  MasterDataType,
  MasterAttribute,
} from "beat-motivator-type";

// 小数の比較怪しい気がするから下駄履かせる
const ERROR_GETA = 10e-6;

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
      .split("\n")
      .filter((_, idx) => idx > 0)
      .map((row) => row.split(","))
      .map((element) => ({
        version: element[0] as Version,
        title: element[1],
        genre: element[2],
        artist: element[3],
        plays: parseInt(element[4]),
        spb:
          element[9] === "---"
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
          element[16] === "---"
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
          element[23] === "---"
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
          element[30] === "---"
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
          element[37] === "---"
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
      }));
  };

  const parseMasterData = (csvElement: string): MasterDataType[] => {
    // TODO: JS力が足りない
    const parsed = csvElement
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
    const ret = new Array<StatisticsType>(12).fill({
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
    });
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
        // TODO: 曲データが見つかりませんでした的な警告表示する？
        console.warn(`music data "${valData.title}" is not found`);
        return;
      }
      ["spb", "spn", "sph", "spa", "spl"].forEach((val) => {
        const key = val as "spb" | "spn" | "sph" | "spa" | "spl";
        if (isNoData(valMaster[key])) return;
        const idx = valMaster[key].level - 1;
        ret[idx].total++;
        if (isNoPlay(valData[key])) return;
        const rate =
          valData[key].score / (valMaster[key].notes * 2) + ERROR_GETA;
        const scoreMaxMinus = valMaster[key].notes * 2 - valData[key].score;
        ret[idx].played++;
        ret[idx].scoreSum += valData[key].score;
        ret[idx].notesSum += valMaster[key].notes;
        if (scoreMaxMinus < 10) ret[idx].maxMinusUnderTen++;
        if (scoreMaxMinus < 100) ret[idx].maxMinusUnderHundred++;
        if (rate > 17.0 / 18.0) ret[idx].maxMinus++;
        if (rate >= 99.0) ret[idx].rate99++;
        if (rate >= 98.0) ret[idx].rate98++;
        if (rate >= 97.0) ret[idx].rate97++;
        if (rate >= 96.0) ret[idx].rate96++;
        if (rate >= 95.0) ret[idx].rate95++;
        if (rate >= 8.0 / 9.0) ret[idx].tripleA++;
        if (rate >= 7.0 / 9.0) ret[idx].doubleA++;
        if (rate >= 6.0 / 9.0) ret[idx].singleA++;
      });
    });
    return ret;
  };

  return { parseData, parseMasterData, calcStatistics };
};
