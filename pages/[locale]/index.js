import React from 'react';
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import Head from 'next/head';
import Hidden from '@material-ui/core/Hidden';
import CssBaseline from '@material-ui/core/CssBaseline';
import brand from '~/public/text/brand';
import { getStaticPaths, makeStaticProps } from '../../lib/getStatic';
import Header from '../../components/Header';
import VideoBanner from '../../components/VideoBanner';
// import About from '../../components/About';
// import Facilities from '../../components/Facilities';
// import Testimonials from '../../components/Testimonials';
// import Expertise from '../../components/Expertise';
// import AskDoctors from '../../components/AskDoctors';
// import CallAction from '../../components/CallAction';
// import Clinics from '../../components/Clinics';
// import OvalTop from '../../components/Parallax/OvalTop';
// import Footer from '../../components/Footer';
// import PageNav from '../../components/PageNav';
// import Notification from '../../components/Notification';

import dynamic from 'next/dynamic'
const OvalTop = dynamic(() =>
    import ('../../components/Parallax/OvalTop'), { ssr: false })
const Footer = dynamic(() =>
    import ('../../components/Footer'), { ssr: false })
const PageNav = dynamic(() =>
    import ('../../components/PageNav'), { ssr: false })
const CallAction = dynamic(() =>
    import ('../../components/CallAction'), { ssr: false })
const AskDoctors = dynamic(() =>
    import ('../../components/AskDoctors'), { ssr: false })
const Expertise = dynamic(() =>
    import ('../../components/Expertise'), { ssr: false })
const Testimonials = dynamic(() =>
    import ('../../components/Testimonials'), { ssr: false })
const Facilities = dynamic(() =>
    import ('../../components/Facilities'), { ssr: false })
const About = dynamic(() =>
    import ('../../components/About'), { ssr: false })




const sectionMargin = margin => (margin * 20);
const useStyles = makeStyles(theme => ({
    mainWrap: {
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        background: theme.palette.type === 'dark' ? theme.palette.background.default : theme.palette.background.paper,
        color: theme.palette.text.primary,
    },
    spaceBottom: {
        marginBottom: sectionMargin(theme.spacing()),
        [theme.breakpoints.down('md')]: {
            marginBottom: sectionMargin(6)
        },
        [theme.breakpoints.down('xs')]: {
            marginBottom: sectionMargin(theme.spacing() / 2)
        }
    },
    spaceTop: {
        marginTop: sectionMargin(theme.spacing()),
        [theme.breakpoints.down('md')]: {
            marginTop: sectionMargin(6)
        },
        [theme.breakpoints.down('xs')]: {
            marginTop: '30px'
        }
    },
    spaceBottomShort: {
        marginBottom: sectionMargin(theme.spacing() / 2),
    },
    spaceTopShort: {
        marginTop: sectionMargin(theme.spacing() / 2),
        [theme.breakpoints.down('xs')]: {
            marginTop: '30px'
        }
    },
    containerWrap: {
        [theme.breakpoints.up('md')]: {
            marginTop: theme.spacing(10),
        },
        '& > section': {
            position: 'relative'
        }
    }
}));

function Landing(props) {
    const classes = useStyles();
    const theme = useTheme();
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { onToggleDark, onToggleDir } = props;

    const data = `${ brand.medical.name } - Holistic Care`;

    return ( <
        React.Fragment >
        <
        Head >
        <
        title > { data } <
        /title> <
        /Head> <
        CssBaseline / >
        <
        div className = { classes.mainWrap } >
        <
        Header onToggleDark = { onToggleDark }
        onToggleDir = { onToggleDir }
        /> <
        main className = { classes.containerWrap } >
        <
        section id = "home" >
        <
        VideoBanner / >
        <
        /section> <
        OvalTop / >
        <
        section className = { classes.spaceTopShort }
        id = "about" >
        <
        About / >
        <
        /section> <
        section className = { classes.spaceTop }
        id = "facility" >
        <
        Facilities / >
        <
        /section> <
        section className = { isTablet ? classes.spaceTopShort : classes.spaceTop }
        id = "our-expertise" >
        <
        Expertise / >
        <
        /section> <
        section className = { isMobile ? classes.spaceTopShort : classes.spaceTop }
        id = "ask-doctors" >
        <
        AskDoctors / >
        <
        /section> <
        section className = { classes.spaceTopShort }
        id = "testimonials" >
        <
        Testimonials / >
        <
        /section> <
        section className = { classes.spaceTopShort }
        id = "call-to-action" >
        <
        CallAction / >
        <
        /section> {
            /* <section className={classes.spaceTopShort} id="clinics">
                        <Clinics />
                      </section> */
        } <
        /main> <
        Hidden mdDown >
        <
        PageNav / >
        <
        /Hidden> <
        section className = { classes.spaceTopShort } >
        <
        Footer toggleDir = { onToggleDir }
        /> <
        /section> {
            /* <Hidden mdDown>
                      <Notification />
                    </Hidden> */
        } <
        /div> <
        /React.Fragment>
    );
}

Landing.propTypes = {
    onToggleDark: PropTypes.func.isRequired,
    onToggleDir: PropTypes.func.isRequired,
};

const getStaticProps = makeStaticProps(['common']);
export { getStaticPaths, getStaticProps };

export default Landing;