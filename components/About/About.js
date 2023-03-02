import React from 'react';
import clsx from 'clsx';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { useTranslation } from 'next-i18next';
import { useText, useTextAlign } from '~/theme/common';
import imgAPI from '~/public/images/imgAPI';
import dynamic from 'next/dynamic'
const  TitleDeco = dynamic(() => import('../Title/WithDecoration'), { ssr: false })
// const  useStyles = dynamic(() => import('./about-style'), { ssr: false })
// const  useTitle = dynamic(() => import('../Title/title-style'), { ssr: false })
const  Counter = dynamic(() => import('../Counter'), { ssr: false })

// import TitleDeco from '../Title/WithDecoration';
import useStyles from './about-style';
import useTitle from '../Title/title-style';
// import Counter from '../Counter';

function About() {
  const text = useText();
  const align = useTextAlign();

  // Media Query
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  // Translation function
  const { t } = useTranslation('common');

  const classes = useStyles();
  const title = useTitle();
  return (
    <div className={classes.root}>
      <Container fixed>
        <Grid container spacing={isDesktop ? 6 : 2}>
          <Grid item md={5} xs={12}>
            <div className={align.textCenter}>
              <TitleDeco bg={imgAPI.medical[1]} text={t('medical-landing.about_title')} />
            </div>
          </Grid>
          <Grid item md={7} xs={12}>
            <Typography className={clsx(title.default, text.subtitle)} variant="h4">
              {t('medical-landing.about_subtitle')}
            </Typography>
            <Counter />
            <blockquote>
              {t('medical-landing.about_quote')}
            </blockquote>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default About;
