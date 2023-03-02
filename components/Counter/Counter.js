import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import clsx from 'clsx';
import { useTranslation } from 'next-i18next';
import useStyles from './counter-style';

function Counter() {
  const { t } = useTranslation('common');
  const classes = useStyles();
  return (
    <div className={classes.counterWrap}>
      <Container fixed>
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          <Grid sm={4} item>
            <div className={clsx(classes.counterItem, classes.deco)}>
              <div className={classes.text}>
                <Typography variant="h3">
                  2000+
                </Typography>
                <Typography component="p">
                  {t('medical-landing.about_clinics')}
                </Typography>
              </div>
            </div>
          </Grid>
          <Grid sm={4} item>
            <div className={clsx(classes.counterItem, classes.deco)}>
              <div className={classes.text}>
                <Typography variant="h3">
                  20000+
                </Typography>
                <Typography component="p">
                  {t('medical-landing.about_doctor')}
                </Typography>
              </div>
            </div>
          </Grid>
          <Grid sm={4} item>
            <div className={clsx(classes.counterItem, classes.deco)}>
              <div className={classes.text}>
                <Typography variant="h3">
                  97%
                </Typography>
                <Typography component="p">
                  {t('medical-landing.about_hours')}
                </Typography>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Counter;
