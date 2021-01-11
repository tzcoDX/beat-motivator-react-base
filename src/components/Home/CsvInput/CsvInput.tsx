import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Box, Typography, Button, TextField } from "@material-ui/core";
import { useForm, SubmitHandler } from "react-hook-form";

import { useDataHandler } from "../../../hooks";
import { StatisticsType, DataType } from "beat-motivator-type";

type FormData = {
  csv: string;
};

type CsvInputProps = {
  setPlayerData: React.Dispatch<React.SetStateAction<DataType[]>>;
};

export const CsvInput: React.FC<CsvInputProps> = (props) => {
  const { setPlayerData } = props;

  const classes = useStyles();
  const theme = useTheme();

  const { register, handleSubmit, errors, reset } = useForm<FormData>();

  const { parseData } = useDataHandler();

  const handleParseCsv: SubmitHandler<FormData> = ({ csv }) => {
    setPlayerData(parseData(csv));
  };

  // console.log(
  //   new Array<StatisticsType>(12).fill({
  //     played: 0,
  //     total: 0,
  //     scoreSum: 0,
  //     notesSum: 0,
  //     maxMinusUnderTen: 0,
  //     maxMinusUnderHundred: 0,
  //     maxMinus: 0,
  //     rate99: 0,
  //     rate98: 0,
  //     rate97: 0,
  //     rate96: 0,
  //     rate95: 0,
  //     tripleA: 0,
  //     doubleA: 0,
  //     singleA: 0,
  //   })
  // );

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
