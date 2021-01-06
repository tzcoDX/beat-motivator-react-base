import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";

import { CsvInput } from "../../components/Home";

const Home: React.FC = () => {
  const classes = useStyles();

  return (
    <Container maxWidth={false}>
      <CsvInput />
    </Container>
  );
};

export default Home;

const useStyles = makeStyles((theme) => ({}));
