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
  notes: number;
  kaidenAverage: number;
  topScore: number;
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

export type MasterAttribute = Pick<
  Attribute,
  "level" | "notes" | "kaidenAverage" | "topScore"
>;

export const useDataHandler = () => {
  // TODO: マスターデータ引数で渡してるのが気持ち悪い、これもRedux案件？
  const parseData = (
    csvElements: string,
    masterData: MasterDataType[]
  ): DataType[] => {
    const parseMissCount = (missCount: string): number =>
      missCount === "---" ? -1 : parseInt(missCount);
    const parseDjLevel = (djLevel: string): DjLevel =>
      djLevel === "---" ? "NO PLAY" : (djLevel as DjLevel);
    return csvElements
      .trimEnd()
      .split("\n")
      .filter((_, idx) => idx > 0)
      .map((row) => row.split(","))
      .map((valData) => {
        const musicData = {
          version: valData[0] as Version,
          // ""が入ってると処理が怪しいので消す
          // TODO: 正規表現の方がよさそう
          title: valData[1].replaceAll('"', ""),
          genre: valData[2].replaceAll('"', ""),
          artist: valData[3].replaceAll('"', ""),
        };
        const valMaster = masterData.find(
          (val) =>
            val.version === musicData.version &&
            val.title === musicData.title &&
            val.genre === musicData.genre &&
            val.artist === musicData.artist
        );
        if (!valMaster) {
          // TODO: 曲データが見つかりませんでした的な警告表示したい
          console.warn(
            `music data "${valData[1]}" in ${valData[0]} is not found`
          );
        }
        return {
          version: musicData.version,
          title: musicData.title,
          genre: musicData.genre,
          artist: musicData.artist,
          plays: parseInt(valData[4]),
          spb: {
            level: parseInt(valData[5]),
            score: parseInt(valData[6]),
            pGreat: parseInt(valData[7]),
            great: parseInt(valData[8]),
            missCount: parseMissCount(valData[9]),
            clearType: valData[10] as ClearType,
            djLevel: parseDjLevel(valData[11]),
            notes: valMaster ? valMaster.spb.notes : -1,
            kaidenAverage: valMaster ? valMaster.spb.kaidenAverage : -1,
            topScore: valMaster ? valMaster.spb.topScore : -1,
          },
          spn: {
            level: parseInt(valData[12]),
            score: parseInt(valData[13]),
            pGreat: parseInt(valData[14]),
            great: parseInt(valData[15]),
            missCount: parseMissCount(valData[16]),
            clearType: valData[17] as ClearType,
            djLevel: parseDjLevel(valData[18]),
            notes: valMaster ? valMaster.spn.notes : -1,
            kaidenAverage: valMaster ? valMaster.spn.kaidenAverage : -1,
            topScore: valMaster ? valMaster.spn.topScore : -1,
          },
          sph: {
            level: parseInt(valData[19]),
            score: parseInt(valData[20]),
            pGreat: parseInt(valData[21]),
            great: parseInt(valData[22]),
            missCount: parseMissCount(valData[23]),
            clearType: valData[24] as ClearType,
            djLevel: parseDjLevel(valData[25]),
            notes: valMaster ? valMaster.sph.notes : -1,
            kaidenAverage: valMaster ? valMaster.sph.kaidenAverage : -1,
            topScore: valMaster ? valMaster.sph.topScore : -1,
          },
          spa: {
            level: parseInt(valData[26]),
            score: parseInt(valData[27]),
            pGreat: parseInt(valData[28]),
            great: parseInt(valData[29]),
            missCount: parseMissCount(valData[30]),
            clearType: valData[31] as ClearType,
            djLevel: parseDjLevel(valData[32]),
            notes: valMaster ? valMaster.spa.notes : -1,
            kaidenAverage: valMaster ? valMaster.spa.kaidenAverage : -1,
            topScore: valMaster ? valMaster.spa.topScore : -1,
          },
          spl: {
            level: parseInt(valData[33]),
            score: parseInt(valData[34]),
            pGreat: parseInt(valData[35]),
            great: parseInt(valData[36]),
            missCount: parseMissCount(valData[37]),
            clearType: valData[38] as ClearType,
            djLevel: parseDjLevel(valData[39]),
            notes: valMaster ? valMaster.spl.notes : -1,
            kaidenAverage: valMaster ? valMaster.spl.kaidenAverage : -1,
            topScore: valMaster ? valMaster.spl.topScore : -1,
          },
          date: valData[40],
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
      level: 0,
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
    // プレー済みじゃないとcsvに項目でてこないのf**k
    master.forEach((valMaster) => {
      ["spb", "spn", "sph", "spa", "spl"].forEach((val) => {
        const key = val as "spb" | "spn" | "sph" | "spa" | "spl";
        if (valMaster[key].level === 0) return;
        ret[valMaster[key].level - 1].total++;
      });
    });
    // TODO: ここらへんもreduceとかでもっといい感じにかけないかな
    data.forEach((valData) => {
      ["spb", "spn", "sph", "spa", "spl"].forEach((val) => {
        const key = val as "spb" | "spn" | "sph" | "spa" | "spl";
        if (valData[key].notes < 0) return;
        const idx = valData[key].level - 1;
        if (valData[key].score === 0) return;
        const rate = valData[key].score / (valData[key].notes * 2) + ERROR_GETA;
        const scoreMaxMinus = valData[key].notes * 2 - valData[key].score;
        ret[idx].played += 1;
        ret[idx].scoreSum += valData[key].score;
        ret[idx].notesSum += valData[key].notes;
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
