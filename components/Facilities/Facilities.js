import React, { useEffect, useRef } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import Carousel from "react-slick";
import PrevIcon from "@material-ui/icons/ArrowBack";
import NextIcon from "@material-ui/icons/ArrowForward";
import { useTranslation } from "next-i18next";
import imgApi from "~/public/images/imgAPI";
import useStyles from "./facilities-style";
// import TitleIcon from "../Title/WithIcon";
// import Card from "../Cards/Default";
// import DotsParallax from "../Parallax/Dots";

import dynamic from 'next/dynamic'
const  DotsParallax = dynamic(() => import('../Parallax/Dots'), { ssr: false })
const  TitleIcon = dynamic(() => import('../Title/WithIcon'), { ssr: false })
const  Card = dynamic(() => import('../Cards/Default'), { ssr: false })



const facilityList = [
  {
    title: "Private Chat",
    img: imgApi.faci[3],
  },

  {
    title: "24/7 Availability of Pediatricians",
    desc: "Quisque consectetur lectus vel orci porttitor gravida ac eu erat. Nullam accumsan nibh tortor.",
    img: imgApi.faci[5],
  },
  {
    title: "Chat With Gynecologists",
    desc: "Proin quis pellentesque dui. Ut sed leo neque. Nullam aliquet iaculis neque a commodo.",
    img: imgApi.faci[6],
  },
  {
    title: "Baby Growth and Milestone Tracking",
    desc: "Proin ac arcu nisl. Duis eu molestie lectus. Nam quis mauris faucibus, aliquet elit eu, rhoncus ipsum.",
    img: imgApi.faci[4],
  },
  {
    title: "Free Consultations",
    desc: "Proin quis pellentesque dui. Ut sed leo neque. Nullam aliquet iaculis neque a commodo.",
    img: imgApi.faci[7],
  },
  {
    title: "Yoga Sessions and Nutrition Counseling",
    desc: "Quisque consectetur lectus vel orci porttitor gravida ac eu erat. Nullam accumsan nibh tortor.",
    img: imgApi.faci[2],
  },
];

function Facilities() {
  const { t } = useTranslation("common");
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const classes = useStyles();
  const slider = useRef(null);
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    arrows: false,
    slidesToScroll: 1,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  useEffect(() => {
    if (theme.direction === "ltr" && window.innerWidth > 1200) {
      const limit = window.innerWidth > 1400 ? 3 : 2;
      const lastSlide = Math.floor(facilityList.length - limit);
      slider.current.slickGoTo(lastSlide);
    }
  }, []);

  return (
    <div className={classes.root} style={{ paddingBottom: "0px" }}>
      <DotsParallax />
      <div className={classes.carouselHandle}>
        <div className={classes.carouselWrap}>
          <Carousel ref={slider} {...settings}>
            {isDesktop && (
              <div className={classes.item}>
                <div className={classes.carouselProp}>
                  <div />
                </div>
              </div>
            )}
            {facilityList.map((item, index) => (
              <div className={classes.item} key={index.toString()}>
                <Card
                  title={item.title}
                  desc={item.desc}
                  img={item.img}
                  button={t("medical-landing.services_button")}
                />
              </div>
            ))}
            {isDesktop && (
              <div className={classes.item}>
                <div className={classes.carouselProp}>
                  <div />
                </div>
              </div>
            )}
          </Carousel>
        </div>
      </div>
      <div className={classes.floatingTitle}>
        <Container fixed>
          <div className={classes.title}>
            <TitleIcon
              text={t("medical-landing.services_title")}
              icon="library_add"
              extended
            />
            <nav className={classes.arrow} style={{ marginTop: "10px" }}>
              <Fab
                size="small"
                onClick={() => slider.current.slickNext()}
                aria-label="prev"
                className={classes.margin}
              >
                <PrevIcon />
              </Fab>
              <Fab
                size="small"
                onClick={() => slider.current.slickPrev()}
                aria-label="next"
                className={classes.margin}
              >
                <NextIcon />
              </Fab>
            </nav>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Facilities;
