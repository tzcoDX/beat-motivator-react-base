import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from "@material-ui/core";

import { DataType } from "hooks";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

type ScoreTableProps = {
  playerData: DataType[];
};

export const ScoreTable: React.FC<ScoreTableProps> = (props) => {
  const { playerData } = props;

  type SpreadedData = {
    level: number;
    title: string;
    difficulty: string;
    score: number;
    rate: number;
    maxMinus: number;
  };
  const spreadedData = playerData.reduce<SpreadedData[]>(
    (accData, curData) =>
      accData.concat(
        ["spb", "spn", "sph", "spa", "spl"].reduce<SpreadedData[]>(
          (accMusic, curKey) => {
            const key = curKey as "spb" | "spn" | "sph" | "spa" | "spl";
            return curData[key].score > 0 && curData[key].notes > 0
              ? accMusic.concat({
                  level: curData[key].level,
                  title: curData.title,
                  difficulty: key.toUpperCase(),
                  score: curData[key].score,
                  rate: (curData[key].score * 100) / (curData[key].notes * 2),
                  maxMinus: curData[key].notes * 2 - curData[key].score,
                })
              : accMusic;
          },
          []
        )
      ),
    []
  );
  spreadedData.sort((a, b) => b.rate - a.rate);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">
              <Typography>☆</Typography>
            </StyledTableCell>
            <StyledTableCell align="center">
              <Typography>title</Typography>
            </StyledTableCell>
            <StyledTableCell align="center">
              <Typography>score</Typography>
            </StyledTableCell>
            <StyledTableCell align="center">
              <Typography>rate</Typography>
            </StyledTableCell>
            <StyledTableCell align="center">
              <Typography>MAX-</Typography>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {spreadedData.map((val, idx) => (
            <StyledTableRow key={idx}>
              <TableCell>
                <Typography>{`☆${val.level}`}</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography>{`${val.title} (${val.difficulty})`}</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography>{val.score}</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography>{`${val.rate.toFixed(2)}%`}</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography>{`MAX-${val.maxMinus}`}</Typography>
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
