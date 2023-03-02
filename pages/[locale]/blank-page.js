import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useTranslation } from 'next-i18next';
import brand from '~/public/text/brand';
import { getStaticPaths, makeStaticProps } from '../../lib/getStatic';
// import Header from '../../components/Header';
// import Footer from '../../components/Footer';
// import Notification from '../../components/Notification';

import dynamic from 'next/dynamic'
const  Notification = dynamic(() => import('../../components/Notification'), { ssr: false })
const  Footer = dynamic(() => import('../../components/Footer'), { ssr: false })
const  Header = dynamic(() => import('../../components/Header'), { ssr: false })

const sectionMargin = margin => (margin * 20);
const useStyles = makeStyles(theme => ({
  mainWrap: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    background: theme.palette.type === 'dark' ? theme.palette.background.default : theme.palette.background.paper,
  },
  spaceBottom: {
    marginBottom: sectionMargin(theme.spacing())
  },
  spaceTop: {
    marginTop: sectionMargin(theme.spacing()),
    [theme.breakpoints.down('md')]: {
      marginTop: sectionMargin(6)
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: sectionMargin(theme.spacing() / 2)
    }
  },
  containerWrap: {
    marginTop: theme.spacing(10),
    padding: theme.spacing(4),
    '& > section': {
      position: 'relative'
    }
  },
}));

function BlankPage(props) {
  const classes = useStyles();
  const { onToggleDark, onToggleDir } = props;
  const { t } = useTranslation('common');

  return (
    <React.Fragment>
      <Head>
        <title>
          { brand.medical.name }
          &nbsp; - Blank page
        </title>
      </Head>
      <CssBaseline />
      <div className={classes.mainWrap}>
        <Header
          onToggleDark={onToggleDark}
          onToggleDir={onToggleDir}
          invert
        />
        <main className={classes.containerWrap}>
          <section className={clsx(classes.spaceTop, classes.spaceBottom)}>
            <Typography variant="h2" align="center" gutterBottom>
              {t('title')}
            </Typography>
            <Typography variant="h4" align="center">
              {t('subtitle')}
            </Typography>
          </section>
        </main>
        <section className={classes.spaceTop}>
          <Footer />
        </section>
        <Notification />
      </div>
    </React.Fragment>
  );
}

BlankPage.propTypes = {
  onToggleDark: PropTypes.func.isRequired,
  onToggleDir: PropTypes.func.isRequired,
};

const getStaticProps = makeStaticProps(['common']);
export { getStaticPaths, getStaticProps };

export default BlankPage;
