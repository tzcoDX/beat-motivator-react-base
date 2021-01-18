import React, { useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";

import { DataType, StatisticsType } from "../../hooks";
import { CsvInput, StatisticsTable } from "../../components/Home";

const Home: React.FC = () => {
  // const classes = useStyles();

  // TODO: GOD STATE化してるのでReduxとかつかいたい
  const [playerData, setPlayerData] = useState<DataType[]>([]);
  const [statistics, setStatistics] = useState<StatisticsType[]>([]);

  return (
    <Container maxWidth={false}>
      <CsvInput setPlayerData={setPlayerData} setStatistics={setStatistics} />
      {!!statistics.length && <StatisticsTable statistics={statistics} />}
    </Container>
  );
};

export default Home;

// const useStyles = makeStyles((theme) => ({}));
