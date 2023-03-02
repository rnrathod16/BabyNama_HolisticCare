import React, { useState } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ScrollAnimation from "react-scroll-animation-wrapper";
import clsx from "clsx";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { useTranslation } from "next-i18next";
import imgAPI from "~/public/images/imgAPI";
import dynamic from 'next/dynamic'

const  ProfileCard = dynamic(() => import('../Cards/Profile'), { ssr: false })
// const  useTitle = dynamic(() => import('../Title/title-style'), { ssr: false })
// const  useStyles = dynamic(() => import('./ask-doctors-style'), { ssr: false })


// import ProfileCard from "../Cards/Profile";
import useTitle from "../Title/title-style";
import useStyles from "./ask-doctors-style";

const categories = ["Dr. Sumitra", "Dr. Rajat", "Dr. Anupriya"];

const doctorsData = [
  {
    avatar: imgAPI.doctors[0],
    name: "Dr. Sumitra Meena",
    title: "MBBS, MD Pediatrics",
    desc: "8 years experience Ex resident safdarjung hospital",
    rating: 95,
    exp: 4,
  },
  {
    avatar: imgAPI.doctors[3],
    name: "Dr. Rajat Goswami",
    title: "MD Paediatrics",
    desc: "10 years experience Consultant paediatrician and newborn specialist Blossoms kids clinics, Rohini, New Delhi",
    rating: 95,
    exp: 4,
  },
  {
    avatar: imgAPI.doctors[4],
    name: "Dr. Anupriya Bajaj",
    title: "MBBS, MD Paediatrics",
    desc: "3 years of experience, Assam Medical College and Hospital, Dibrugarh PGPN, Boston University",
    rating: 95,
    exp: 4,
  },
];

function AskDoctors() {
  // Theme breakpoints
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  // Translation Function
  const { t } = useTranslation("common");

  const classes = useStyles();
  const title = useTitle();
  const [selectedIndex, setSelectedIndex] = useState("Dr. Sumitra");

  function handleListItemClick(event, index) {
    setSelectedIndex(index);
  }

  const renderCard = (item, index) => {
    return (
      <ProfileCard
        key={index.toString()}
        name={item.name}
        title={item.title}
        avatar={item.avatar}
        rating={item.rating}
        exp={item.exp}
        desc={item.desc}
      />
    );
  };

  return (
    <div className={classes.root}>
      <div className={classes.deco} />
      <Container fixed={isDesktop}>
        <Grid container spacing={isDesktop ? 3 : 0} justifyContent="center">
          <Grid item md={2} sm={9} xs={12}>
            <ScrollAnimation
              animateOnce
              animateIn="fadeInLeftShort"
              offset={-100}
              delay={200}
              duration={0.3}
            >
              <div className={classes.sideFilter}>
                <Typography variant="h4" className={title.primary}>
                  {t("medical-landing.ask_doctors")}
                </Typography>
                <List component="nav">
                  {categories.map((item, index) => (
                    <ListItem
                      button
                      key={index.toString()}
                      className={clsx(
                        classes.filter,
                        selectedIndex === item && classes.active
                      )}
                      onClick={(event) => handleListItemClick(event, item)}
                    >
                      <ListItemText primary={item} />
                    </ListItem>
                  ))}
                </List>
              </div>
            </ScrollAnimation>
          </Grid>
          <Grid item lg={8} md={10} xs={12}>
            <div className={classes.massonry}>
              <Grid container spacing={isDesktop ? 6 : 4}>
                {doctorsData.map((item, index) => {
                  var temp = -1;
                  {
                    selectedIndex === "Dr. Sumitra" &&
                    item.name === "Dr. Sumitra Meena"
                      ? (temp = -1)
                      : null;
                  }
                  {
                    selectedIndex === "Dr. Rajat" &&
                    item.name === "Dr. Rajat Goswami"
                      ? (temp = -31)
                      : null;
                  }
                  {
                    selectedIndex === "Dr. Anupriya" &&
                    item.name === "Dr. Anupriya Bajaj"
                      ? (temp = -200)
                      : null;
                  }

                  return (
                    <Grid
                      item
                      sm={6}
                      xs={12}
                      key={index.toString()}
                      style={{ order: temp }}
                    >
                      <ScrollAnimation
                        animateOnce
                        animateIn="fadeInUpShort"
                        offset={-100}
                        delay={index * 200}
                        duration={0.4}
                      >
                        <div>
                          {selectedIndex === "Dr. Sumitra" &&
                          item.name === "Dr. Sumitra Meena"
                            ? renderCard(item, index)
                            : null}
                          {selectedIndex === "Dr. Rajat" &&
                          item.name === "Dr. Rajat Goswami"
                            ? renderCard(item, index)
                            : null}
                          {selectedIndex === "Dr. Anupriya" &&
                          item.name === "Dr. Anupriya Bajaj"
                            ? renderCard(item, index)
                            : null}
                        </div>
                      </ScrollAnimation>
                    </Grid>
                  );
                })}
              </Grid>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default AskDoctors;
