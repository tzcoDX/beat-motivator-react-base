import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";

import TwitterIcon from "@material-ui/icons/Twitter";

import { StatisticsType } from "hooks/useDataHandler";

type TweetButtonProps = {
  statistics: StatisticsType[];
};

export const TweetButton: React.FC<TweetButtonProps> = (props) => {
  const { statistics } = props;

  const classes = useStyles();

  const avgRate12 =
    (statistics[11].scoreSum * 100) / statistics[11].notesSum / 2;
  const avgRate11 =
    (statistics[10].scoreSum * 100) / statistics[10].notesSum / 2;
  const totalMaxMinusUnderTen = statistics.reduce<number>(
    (acc, cur) => acc + cur.maxMinusUnderTen,
    0
  );
  const totalRate99 = statistics.reduce<number>(
    (acc, cur) => acc + cur.rate99,
    0
  );
  const totalRate98 = statistics.reduce<number>(
    (acc, cur) => acc + cur.rate98,
    0
  );

  const tweetText =
    `☆12 avg: ${avgRate12.toFixed(2)}％ ` +
    `(${statistics[11].played}/${statistics[11].total}) / ` +
    `max-**: ${statistics[11].maxMinusUnderHundred} / ` +
    `99％: ${statistics[11].rate99} / ` +
    `98％: ${statistics[11].rate98} / ` +
    `97％: ${statistics[11].rate97} / ` +
    `max-: ${statistics[11].maxMinus} / ` +
    `AAA: ${statistics[11].tripleA}%0A` +
    `☆11 avg: ${avgRate11.toFixed(2)}％ ` +
    `(${statistics[10].played}/${statistics[10].total}) / ` +
    `max-**: ${statistics[10].maxMinusUnderHundred} / ` +
    `99％: ${statistics[10].rate99} / ` +
    `98％: ${statistics[10].rate98} / ` +
    `97％: ${statistics[10].rate97} / ` +
    `max-: ${statistics[10].maxMinus} / ` +
    `AAA: ${statistics[10].tripleA}%0A` +
    `Total / max-*: ${totalMaxMinusUnderTen} / 99％: ${totalRate99} / 98％: ${totalRate98}%0A%0A`;

  return (
    <Button
      className={classes.button}
      startIcon={<TwitterIcon htmlColor="white" />}
      href={`https://twitter.com/intent/tweet?text=${tweetText}&url=https://goofy-wiles-fc39fe.netlify.app/&hashtags=beat_motivator`}
      target="_blank"
      rel="nofollow noopener noreferrer"
    >
      <Typography className={classes.text} variant="body1">
        Tweet
      </Typography>
    </Button>
  );
};

const useStyles = makeStyles({
  button: {
    backgroundColor: "#00acee",
    "&:hover": {
      backgroundColor: "#00acee",
    },
  },
  text: {
    color: "white",
  },
});
