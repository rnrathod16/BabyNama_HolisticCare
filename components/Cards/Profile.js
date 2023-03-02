import React from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import useStyles from "./cards-style";
import dynamic from 'next/dynamic'
const  ReadMore = dynamic(() => import('../Readmore/ReadMore'), { ssr: false })
// import ReadMore from "../Readmore/ReadMore";
import Image from 'next/image'


function Profile(props) {
  const classes = useStyles();
  const { avatar, name, title, desc, rating, exp } = props;
  return (
    <Paper className={classes.profile}>
      <div className={classes.personBlock}>
        <Avatar className={classes.photo}>
          <Image src={avatar} alt={name} width={80} height={128} loading="lazy"/>
        </Avatar>
        <div className={classes.nameCard}>
          <h4>{name}</h4>
          <Typography>{title}</Typography>
        </div>
      </div>
      <hr className={classes.divider} />
      <div className={classes.action}>
        {/* <div className={classes.property}> */}
        {/* <span>
            <i className="ion-ios-thumbs-up" />
            &nbsp;
            {rating}
            %
          </span>
          <span>
            <i className="ion-ios-briefcase" />
            &nbsp;
            {exp}
            &nbsp;Years
          </span>
        </div>
        <Button variant="contained" color="secondary" className={classes.button}>
          chat
        </Button> */}
        <ReadMore limit={50} className="mt-2">
          {desc}
        </ReadMore>
      </div>
    </Paper>
  );
}

Profile.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
};

export default Profile;
