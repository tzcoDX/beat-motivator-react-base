import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Box, Typography, Button, TextField } from "@material-ui/core";
import { useForm, SubmitHandler } from "react-hook-form";

type FormData = {
  csv: string;
};

type CsvInputProps = {};

export const CsvInput: React.FC<CsvInputProps> = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  const { register, handleSubmit, errors, reset } = useForm<FormData>();

  const handleParseCsv: SubmitHandler<FormData> = ({ csv }) => {
    console.log(csv);
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
