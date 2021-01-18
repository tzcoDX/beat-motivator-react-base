import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from "@material-ui/core";

import { DataType, MasterDataType } from "hooks";

type ScoreTableProps = {
  playerData: DataType[];
  masterData: MasterDataType[];
};

export const ScoreTable: React.FC<ScoreTableProps> = (props) => {
  const { playerData } = props;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            <Typography>☆</Typography>
          </TableCell>
          <TableCell>
            <Typography>title</Typography>
          </TableCell>
          <TableCell>
            <Typography>score</Typography>
          </TableCell>
          <TableCell>
            <Typography>rate</Typography>
          </TableCell>
          <TableCell>
            <Typography>MAX-</Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {/* {playerData.map((val, idx) => {
          const rate =
            val.notes === 0 ? 0 : (val.score * 100.0) / (val.notes * 2);
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
        })} */}
      </TableBody>
    </Table>
  );
};
