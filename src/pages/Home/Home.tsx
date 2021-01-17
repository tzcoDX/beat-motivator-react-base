import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";

import { useDataHandler, DataType, StatisticsType } from "../../hooks";
import { CsvInput } from "../../components/Home";

const Home: React.FC = () => {
  const classes = useStyles();

  // TODO: GOD STATE化してるのでReduxとかつかいたい
  const [playerData, setPlayerData] = useState<DataType[]>([]);
  const [statistics, setStatistics] = useState<StatisticsType[]>([]);
  const { calcStatistics } = useDataHandler();

  return (
    <Container maxWidth={false}>
      <CsvInput setPlayerData={setPlayerData} setStatistics={setStatistics} />
    </Container>
  );
};

export default Home;

const useStyles = makeStyles((theme) => ({}));
