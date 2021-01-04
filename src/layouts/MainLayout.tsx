import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Container, Typography } from "@material-ui/core";

const MainLayout: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <section style={{ display: "flex" }}>
      <main className={classes.content}>
        <Box display="flex" justifyContent="center">
          <Typography variant="caption">意味のないヘッダー</Typography>
        </Box>
        <Container>
          <>{children}</>
        </Container>
        <Box display="flex" justifyContent="center">
          <Typography variant="caption">意味のないフッター</Typography>
        </Box>
      </main>
    </section>
  );
};

export default MainLayout;

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
  },
}));
