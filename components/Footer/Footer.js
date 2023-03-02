import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { useTheme } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import LangIcon from '@material-ui/icons/Language';
import InputAdornment from '@material-ui/core/InputAdornment';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import logo from '~/public/images/logo.png';
import brand from '~/public/text/brand';
import { useTextAlign } from '~/theme/common';
import useStyles from './footer-style';
import languageDetector from '../../lib/languageDetector';
import i18nextConfig from '../../next-i18next.config';

function Copyright() {
  return (
    <Typography variant="body2" display="block" color="textSecondary">
      &copy;&nbsp;
      {brand.medical.footerText}
    </Typography>
  );
}

const footers = [
  {
    title: 'Company',
    description: ['Team', 'History', 'Contact us', 'Locations'],
    link: ['#team', '#history', '#contact-us', '#locations'],
  },
  {
    title: 'Resources',
    description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
    link: ['#resource', '#resource-name', '#another-resource', '#final-resource'],
  },
  {
    title: 'Legal',
    description: ['Privacy policy', 'Terms of use'],
    link: ['#privacy-policy', '#terms-of-use'],
  },
];

function Footer(props) {
  // Theme breakpoints
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Translation Function
  const router = useRouter();
  const { t, i18n } = useTranslation('common');

  const classes = useStyles();
  const align = useTextAlign();
  const [values, setValues] = useState({
    lang: i18n.language
  });

  function handleChange(event) {
    const lang = event.target.value;
    let href = router.asPath;
    let pName = router.pathname;
    Object.keys(router.query).forEach((k) => {
      if (k === 'locale') {
        pName = pName.replace(`[${k}]`, lang);
        return;
      }
      pName = pName.replace(`[${k}]`, router.query[k]);
    });
    if (lang) {
      href = pName;
    }

    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: lang,
    }));

    router.push(href);
    languageDetector.cache(lang);
    if (lang === 'ar') {
      props.toggleDir('rtl');
    } else {
      props.toggleDir('ltr');
    }
  }

  return (
    <Container maxWidth="lg" component="footer" className={classes.footer} style={{ paddingBottom: "32px" }}>
      <Grid container spacing={4} style={{ justifyContent: "center", alignItems: "center" }}>
        <Grid item xs={12} md={3}>
          <Box mr={-2} mt={-2}>
            <div className={classes.logo} >
              <img src={logo} alt="logo" style={{ filter: "none", width: "150px" }} />
              {/* <Typography variant="h6" color="textPrimary">
                {brand.medical.projectName}
              </Typography> */}
            </div>
            <Typography color="textPrimary" className={classes.footerDesc} gutterBottom>
              {t('medical-landing.footer_paragraph')}
            </Typography>
            {isDesktop && <Copyright />}
          </Box>
        </Grid>
        {/* <Grid item xs={12} md={6}>
          <Grid container spacing={isTablet ? 0 : 4} justifyContent="space-evenly">
            {footers.map(footer => (
              <Grid item xs={12} md={3} key={footer.title} className={classes.siteMapItem}>
                {isDesktop && (
                  <div>
                    <Typography variant="h6" className={classes.title} color="textPrimary" gutterBottom>
                      {footer.title}
                    </Typography>
                    <ul>
                      {footer.description.map((item, index) => (
                        <li key={item}>
                          <Link href={footer.link[index]} variant="subtitle1" color="textSecondary">
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {isMobile && (
                  <ExpansionPanel
                    square
                    classes={{
                      root: classes.accordionRoot,
                    }}
                  >
                    <ExpansionPanelSummary
                      expandIcon={<ExpandMoreIcon className={classes.accordionIcon} />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      classes={{
                        content: classes.accordionContent,
                      }}
                    >
                      <strong>
                        {footer.title}
                      </strong>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <ul>
                        {footer.description.map((item, index) => (
                          <li key={item}>
                            <Link href={footer.link[index]} variant="subtitle1" color="textSecondary">
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                )}
              </Grid>
            ))}
          </Grid>
        </Grid> */}
        <Grid item xs={12} md={3}>
          <div className={classes.socmed}>
            <a href="https://twitter.com/BabyNama/" target="_blank">
              <IconButton aria-label="FB" className={classes.margin} size="small">
                <i className="ion-logo-twitter" />
              </IconButton>
            </a>
            <a href="https://www.facebook.com/groups/203625581851750/?mibextid=HsNCOg" target="_blank">
              <IconButton aria-label="TW" className={classes.margin} size="small">
                <i className="ion-logo-facebook" />
              </IconButton>
            </a>
            <a href="https://www.instagram.com/babynamahq/" target="_blank">
              <IconButton aria-label="IG" className={classes.margin} size="small">
                <i className="ion-logo-instagram" />
              </IconButton>
            </a>
            <a href="https://www.linkedin.com/company/babynama/" target="_blank">
              <IconButton aria-label="LI" className={classes.margin} size="small">
                <i className="ion-logo-linkedin" />
              </IconButton>
            </a>
            <a href="https://www.youtube.com/c/Babynama" target="_blank">
              <IconButton aria-label="LI" className={classes.margin} size="small">
                <i className="ion-logo-youtube" />
              </IconButton>
            </a>
            <a href="https://chat.whatsapp.com/LDYWzCC72tbGNmR4hP1ra3" target="_blank">
              <IconButton aria-label="LI" className={classes.margin} size="small">
                <i className="ion-logo-whatsapp" />
              </IconButton>
            </a>
          </div>
          {/* <Select
            value={values.lang}
            onChange={handleChange}
            startAdornment={(
              <InputAdornment className={classes.icon} position="start">
                <LangIcon />
              </InputAdornment>
            )}
            className={classes.selectLang}
            input={<OutlinedInput labelWidth={200} name="lang" id="outlined-lang-simple" />}
          >
            {i18nextConfig.i18n.locales.map((locale) => (
              <MenuItem key={locale} value={locale}>{t(locale)}</MenuItem>
            ))}
          </Select> */}
        </Grid>
      </Grid>
      {isMobile && (
        <div className={align.textCenter}>
          <Box p={4}>
            <Copyright />
          </Box>
        </div>
      )}
    </Container>
  );
}

Footer.propTypes = {
  toggleDir: PropTypes.func,
};

Footer.defaultProps = {
  toggleDir: () => { },
};

export default Footer;
