import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Box, Typography, Button, TextField } from "@material-ui/core";
import { useForm, SubmitHandler } from "react-hook-form";

import {
  useDataHandler,
  DataType,
  MasterDataType,
  StatisticsType,
} from "../../../hooks";

type FormData = {
  csv: string;
};

type CsvInputProps = {
  setPlayerData: React.Dispatch<React.SetStateAction<DataType[]>>;
  setStatistics: React.Dispatch<React.SetStateAction<StatisticsType[]>>;
};

export const CsvInput: React.FC<CsvInputProps> = (props) => {
  const { setPlayerData, setStatistics } = props;

  const classes = useStyles();
  const theme = useTheme();

  const { register, handleSubmit, errors, reset } = useForm<FormData>();

  // TODO: ここらへんもReduxに押し込めた方がよい？
  const { parseData, parseMasterData, calcStatistics } = useDataHandler();

  const handleParseCsv: SubmitHandler<FormData> = ({ csv }) => {
    // 入力データをパース
    const playerData = parseData(csv);
    setPlayerData(playerData);
    console.log(playerData);

    // マスターのcsvを読み込む
    // TODO: 処理が怪しすぎる
    (async () => {
      const masterData = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", `${process.env.PUBLIC_URL}/master_sp_songs.csv`);
        xhr.onload = () => {
          resolve(parseMasterData(xhr.response));
        };
        xhr.send(null);
      });
      console.log(masterData);

      const statistics = calcStatistics(
        playerData,
        masterData as MasterDataType[]
      );
      console.log(statistics);
      setStatistics(statistics);
    })();
  };

  return (
    <Box display="flex" flexDirection="column" gridGap={theme.spacing(1)}>
      <Box display="flex">
        <a
          href="https://p.eagate.573.jp/game/2dx/28/djdata/score_download.html?style=SP"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Typography>CSV</Typography>
        </a>
        <Typography>を入れてね！</Typography>
      </Box>
      <TextField
        className={classes.csvInput}
        multiline
        variant="outlined"
        rowsMax={5}
        name="csv"
        label="CSVを入力してください"
        inputRef={register({
          required: "CSVが入力されていません",
        })}
        error={errors.csv != null}
        helperText={errors.csv?.message}
      />
      <Box>
        <Button variant="contained" onClick={handleSubmit(handleParseCsv)}>
          submit
        </Button>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  csvInput: {
    width: "100%",
  },
}));
