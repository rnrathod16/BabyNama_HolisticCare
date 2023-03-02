import React from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import useStyles from "./cards-style";
import Image from "next/image";

function Services(props) {
  const classes = useStyles();
  const { img, title, desc, button } = props;
  return (
    <Paper className={classes.defaultCard} style={{ height: "320px" }}>
      <figure>
        <Image src={img} alt="img" width={240} height={170} loading="lazy"/>
      </figure>
      <div
        className={classes.text}
        style={{
          height: "38%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography display="block" variant="h6">
          {title}
        </Typography>
      </div>
      {/* <Button variant="contained" color="secondary" className={classes.button}>
        {button}
      </Button> */}
    </Paper>
  );
}

Services.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  // button: PropTypes.string.isRequired,
};

export default Services;
