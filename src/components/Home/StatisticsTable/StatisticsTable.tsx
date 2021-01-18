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

import { StatisticsType } from "hooks";

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

type StatisticsTableProps = {
  statistics: StatisticsType[];
};

export const StatisticsTable: React.FC<StatisticsTableProps> = (props) => {
  const { statistics } = props;
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">
              <Typography>☆</Typography>
            </StyledTableCell>
            <StyledTableCell align="center">
              <Typography>played / total</Typography>
            </StyledTableCell>
            <StyledTableCell align="center">
              <Typography>average rate</Typography>
            </StyledTableCell>
            <StyledTableCell align="center">
              <Typography>MAX-*</Typography>
            </StyledTableCell>
            <StyledTableCell align="center">
              <Typography>MAX-**</Typography>
            </StyledTableCell>
            <StyledTableCell align="center">
              <Typography>99%</Typography>
            </StyledTableCell>
            <StyledTableCell align="center">
              <Typography>98%</Typography>
            </StyledTableCell>
            <StyledTableCell align="center">
              <Typography>97%</Typography>
            </StyledTableCell>
            <StyledTableCell align="center">
              <Typography>96%</Typography>
            </StyledTableCell>
            <StyledTableCell align="center">
              <Typography>95%</Typography>
            </StyledTableCell>
            <StyledTableCell align="center">
              <Typography>MAX-</Typography>
            </StyledTableCell>
            <StyledTableCell align="center">
              <Typography>AAA</Typography>
            </StyledTableCell>
            <StyledTableCell align="center">
              <Typography>AA</Typography>
            </StyledTableCell>
            <StyledTableCell align="center">
              <Typography>A</Typography>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {statistics.map((val, idx) => {
            const rate =
              val.notesSum === 0
                ? 0
                : (val.scoreSum * 100.0) / (val.notesSum * 2);
            return (
              <StyledTableRow key={idx}>
                <TableCell>
                  <Typography>{`☆${idx + 1}`}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography>{`${val.played}/${val.total}`}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography>{rate.toFixed(3) + "%"}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography>{val.maxMinusUnderTen}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography>{val.maxMinusUnderHundred}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography>{val.rate99}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography>{val.rate98}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography>{val.rate97}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography>{val.rate96}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography>{val.rate95}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography>{val.maxMinus}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography>{val.tripleA}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography>{val.doubleA}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography>{val.singleA}</Typography>
                </TableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
