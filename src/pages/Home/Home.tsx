import React, { useState } from "react";
import { useTheme } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";

import { DataType, StatisticsType } from "../../hooks";
import { CsvInput, StatisticsTable, ScoreTable } from "../../components/Home";

const Home: React.FC = () => {
  // TODO: GOD STATE化してるのでReduxとかつかいたい
  const [playerData, setPlayerData] = useState<DataType[]>([]);
  const [statistics, setStatistics] = useState<StatisticsType[]>([]);

  const theme = useTheme();

  return (
    <Box display="flex" flexDirection="column" gridGap={theme.spacing(2)}>
      <CsvInput setPlayerData={setPlayerData} setStatistics={setStatistics} />
      {!!statistics.length && (
        <Box display="flex" flexDirection="column" gridGap={theme.spacing(1)}>
          <Typography variant="h5">Statistics</Typography>
          <StatisticsTable statistics={statistics} />
        </Box>
      )}
      {!!playerData.length && (
        <Box display="flex" flexDirection="column" gridGap={theme.spacing(1)}>
          <Typography variant="h5">PlayData</Typography>
          <ScoreTable playerData={playerData} />
        </Box>
      )}
    </Box>
  );
};

export default Home;
