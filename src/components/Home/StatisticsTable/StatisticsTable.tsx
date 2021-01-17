import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from "@material-ui/core";

import { StatisticsType } from "hooks";

type StatisticsTableProps = {
  statistics: StatisticsType[];
};

export const StatisticsTable: React.FC<StatisticsTableProps> = (props) => {
  const { statistics } = props;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <Typography>☆</Typography>
          </TableCell>
          <TableCell>
            <Typography>played / total</Typography>
          </TableCell>
          <TableCell>
            <Typography>average / rate</Typography>
          </TableCell>
          <TableCell>
            <Typography>MAX-*</Typography>
          </TableCell>
          <TableCell>
            <Typography>MAX-**</Typography>
          </TableCell>
          <TableCell>
            <Typography>99%</Typography>
          </TableCell>
          <TableCell>
            <Typography>98%</Typography>
          </TableCell>
          <TableCell>
            <Typography>97%</Typography>
          </TableCell>
          <TableCell>
            <Typography>96%</Typography>
          </TableCell>
          <TableCell>
            <Typography>95%</Typography>
          </TableCell>
          <TableCell>
            <Typography>MAX-</Typography>
          </TableCell>
          <TableCell>
            <Typography>AAA</Typography>
          </TableCell>
          <TableCell>
            <Typography>AA</Typography>
          </TableCell>
          <TableCell>
            <Typography>A</Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {statistics.map((val, idx) => {
          const rate =
            val.notesSum === 0
              ? 0
              : (val.scoreSum * 100.0) / (val.notesSum * 2);
          return (
            <TableRow key={idx}>
              <TableCell>
                <Typography>{`☆${idx + 1}`}</Typography>
              </TableCell>
              <TableCell>
                <Typography>{`${val.played}/${val.total}`}</Typography>
              </TableCell>
              <TableCell>
                <Typography>{rate.toFixed(3) + "%"}</Typography>
              </TableCell>
              <TableCell>
                <Typography>{val.maxMinusUnderTen}</Typography>
              </TableCell>
              <TableCell>
                <Typography>{val.maxMinusUnderHundred}</Typography>
              </TableCell>
              <TableCell>
                <Typography>{val.rate99}</Typography>
              </TableCell>
              <TableCell>
                <Typography>{val.rate98}</Typography>
              </TableCell>
              <TableCell>
                <Typography>{val.rate97}</Typography>
              </TableCell>
              <TableCell>
                <Typography>{val.rate96}</Typography>
              </TableCell>
              <TableCell>
                <Typography>{val.rate95}</Typography>
              </TableCell>
              <TableCell>
                <Typography>{val.maxMinus}</Typography>
              </TableCell>
              <TableCell>
                <Typography>{val.tripleA}</Typography>
              </TableCell>
              <TableCell>
                <Typography>{val.doubleA}</Typography>
              </TableCell>
              <TableCell>
                <Typography>{val.singleA}</Typography>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
