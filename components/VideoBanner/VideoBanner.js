import React, { useState, useEffect } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PlayIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import YouTube from 'react-youtube';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import { useTranslation } from 'next-i18next';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { useText } from '~/theme/common';
import imgApi from '~/public/images/imgAPI';
// import yt from '~/youtube';
import useStyles from './banner-style';
// import DotsParallax from '../Parallax/Dots';
import dynamic from 'next/dynamic'
const  DotsParallax = dynamic(() => import('../Parallax/Dots'), { ssr: false })

function VideoBanner() {
  // Theme breakpoints
  const theme = useTheme();
  const text = useText();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isTablet = useMediaQuery(theme.breakpoints.up('sm'));
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Translation function
  const { t } = useTranslation('common');

  // Youtube player
  const [play, setPlayed] = useState(false);
  const [playCtrl, setPlayedCtrl] = useState(true);
  const [player, setPlayer] = useState([]);

  // Search box
  // const [values, setValue] = useState({
  //   query: '',
  // });
  const classes = useStyles();

  useEffect(() => {
    if (isDesktop) {
      /* Attention
       ** HandleScroll function to optimize site with video background may give an error log
       ** Uncaught TypeError: Cannot read property 'src' of null
       ** It's because HMR in development mode, and react-youtube need to refresh.
       ** The error log will not happen in production mode or just reload browser (development mode)
       ** You can uncomment _onPlay() function, if you don't want see error browser log.
       ** But then every changes you make, the browser will auto reload.
       */
      // _onPlay();
    }
  }, []);

  // const _onEnd = (event) => {
  //   event.target.playVideo();
  // };

  // const _onPlay = () => {
  //   const curTime = player[0].getCurrentTime();
  //   if (curTime > 0) {
  //     setPlayed(true);
  //     setPlayedCtrl(true);
  //   }
  // };

  // const _onReady = (event) => {
  //   player.push(event.target);
  //   setPlayer(player);
  // };

  // const _onTogglePause = () => {
  //   setPlayedCtrl(!playCtrl);
  //   if (playCtrl) {
  //     player[0].pauseVideo();
  //   } else {
  //     player[0].playVideo();
  //   }
  // };

  const opts = {
    height: '720',
    width: '1080',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      controls: 0,
      rel: 0,
      showinfo: 0,
      mute: 1,
      origin: 'http://localhost:3000',
    },
  };

  // const handleChange = (event, type) => {
  //   setValue({ ...values, [type]: event.target.value });
  // };

  return (
    <div className={classes.heroContent}>
      <Hidden smUp>
        <figure className={classes.mobileCover}>
          <img src={imgApi.medical[0]} alt="cover" />
        </figure>
      </Hidden>
      <Container fixed={isDesktop}>
        <Grid container spacing={6}>
          <Grid item md={6} xs={12}>
            <div
              className={classes.bannerText}
              style={{ paddingBottom: '0px' }}
            >
              <div className={classes.title} style={{ marginTop: '73px' }}>
                <Typography
                  variant="h3"
                  className={clsx(classes.textHelper, text.title)}
                  style={{ color: 'orange' }}
                >
                  {t('medical-landing.banner_title')}
                </Typography>
              </div>
              <Typography
                className={clsx(classes.subtitle, text.subtitle2)}
                variant="h5"
                style={{ fontWeight: '700' }}
              >
                {t('medical-landing.banner_subtitle')}
              </Typography>

              {isMobile && (
                <Button
                  size="large"
                  variant="contained"
                  color="primary"
                  href=""
                  className={classes.button}
                  style={{
                    width: '58%',
                    backgroundColor: '#03ACF2',
                    color: 'white',
                  }}
                >
                  <AnchorLink
                    href="#call-to-action"
                    style={{ textDecoration: 'none' }}
                  >
                    {t('medical-landing.cta_btn')}
                  </AnchorLink>
                </Button>
              )}
              {isDesktop && (
                <Button
                  size="large"
                  variant="contained"
                  color="primary"
                  href=""
                  className={classes.button}
                  style={{ width: '58%' }}
                >
                  <AnchorLink
                    href="#call-to-action"
                    style={{ textDecoration: 'none', color: 'white' }}
                  >
                    {t('medical-landing.cta_btn')}
                  </AnchorLink>
                </Button>
              )}
            </div>
          </Grid>
          {isTablet && (
            <Grid item md={6} className={classes.visualContent}>
              <div className={classes.decoBanner}>
                <div className={classes.menuBg} />
                <div className={classes.videoBg} />
              </div>
              <div className={classes.videoWrap}>
                <div className={classes.videoFigure}>
                  <div className={classes.innerFigure}>
                    {/* <Hidden mdDown>
                      {play && (
                        <IconButton
                          className={classes.btnPlay}
                          onClick={_onTogglePause}
                        >
                          {playCtrl ? <PauseIcon /> : <PlayIcon />}
                        </IconButton>
                      )}
                    </Hidden> */}
                    {!play || isMobile ? (
                      <img src={imgApi.medical[0]} alt="cover" />
                    ) : <img src={imgApi.medical[0]} alt="cover" />}
                  </div>
                </div>
              </div>
              <div className={classes.parallaxBanner}>
                <DotsParallax />
              </div>
            </Grid>
          )}
        </Grid>
      </Container>
    </div>
  );
}

export default VideoBanner;
