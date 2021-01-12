import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";

import { MasterDataType, DataType } from "beat-motivator-type";

import { useDataHandler } from "../../hooks";
import { CsvInput } from "../../components/Home";

const Home: React.FC = () => {
  const classes = useStyles();

  const [masterData, setMasterData] = useState<MasterDataType[]>([]);
  const [playerData, setPlayerData] = useState<DataType[]>([]);

  // TODO: csvの読み込みもhooksに含めて、できればcontext化したい
  const { parseMasterData } = useDataHandler();

  // TODO: ここらへんの処理怪しすぎる
  useEffect(() => {
    // マスターのcsvを読み込む
    if (playerData.length === 0) return;
    (async () => {
      setMasterData(
        await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.open("GET", `${process.env.PUBLIC_URL}/master_sp_songs.csv`);
          xhr.onload = () => {
            resolve(parseMasterData(xhr.response));
          };
          xhr.send(null);
        })
      );
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerData]);

  console.log(playerData);
  console.log(masterData);

  return (
    <Container maxWidth={false}>
      <CsvInput setPlayerData={setPlayerData} />
    </Container>
  );
};

export default Home;

const useStyles = makeStyles((theme) => ({}));
