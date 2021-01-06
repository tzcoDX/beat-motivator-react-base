import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Box, Typography, Button, TextField } from "@material-ui/core";
import { useForm, SubmitHandler } from "react-hook-form";

import { DataType, Version, ClearType, DjLevel } from "data-type";

type FormData = {
  csv: string;
};

type CsvInputProps = {};

export const CsvInput: React.FC<CsvInputProps> = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  const { register, handleSubmit, errors, reset } = useForm<FormData>();

  const handleParseCsv: SubmitHandler<FormData> = ({ csv }) => {
    const data = parseData(
      csv
        .split("\n")
        .filter((_, idx) => idx > 0)
        .map((row) => row.split(","))
    );
    console.log(data);
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

const parseMissCount = (missCount: string): number | "NO PLAY" =>
  missCount === "---" ? "NO PLAY" : parseInt(missCount);

const parseDjLevel = (djLevel: string): DjLevel =>
  djLevel === "---" ? "NO PLAY" : (djLevel as DjLevel);
