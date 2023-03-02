import React, { useState, useEffect } from "react";
import App from "next/app";
import Head from "next/head";
import PropTypes from "prop-types";
import {
  ThemeProvider,
  createTheme,
  StylesProvider,
  jssPreset,
} from "@material-ui/core/styles";
import { create } from "jss";
import { PageTransition } from "next-page-transitions";
import rtl from "jss-rtl";
import CssBaseline from "@material-ui/core/CssBaseline";
import LoadingBar from "react-top-loading-bar";
import { appWithTranslation } from "next-i18next";
import lngDetector from "../lib/languageDetector";
import appTheme from "../theme/appTheme";
/* import css vendors */
import "~/vendors/hamburger-menu.css";
import "animate.css/animate.css";
import "../vendors/top-loading-bar.css";
import "../vendors/animate-extends.css";
import "../vendors/page-transition.css";
import "../vendors/slick/slick.css";
import "../vendors/slick/slick-theme.css";

let themeType = "light";
if (typeof Storage !== "undefined") {
  // eslint-disable-line
  themeType = localStorage.getItem("luxiTheme") || "light";
}

function MyApp(props) {
  const [loading, setLoading] = useState(0);
  const curLang = lngDetector.detect();

  const [theme, setTheme] = useState({
    ...appTheme("fresh", themeType),
    direction: curLang === "ar" ? "rtl" : "ltr",
  });

  useEffect(() => {
    // Set layout direction
    document.dir = curLang === "ar" ? "rtl" : "ltr";
    document.documentElement.setAttribute("lang", curLang);

    // Remove preloader
    const preloader = document.getElementById("preloader");
    if (preloader !== null || undefined) {
      setTimeout(() => {
        preloader.remove();
      }, 1500);
    }

    // Remove loading bar
    setLoading(0);
    setTimeout(() => {
      setLoading(100);
    }, 2000);

    // Refresh JSS in SSR
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  const toggleDarkTheme = () => {
    const newPaletteType = theme.palette.type === "light" ? "dark" : "light";
    localStorage.setItem(
      "luxiTheme",
      theme.palette.type === "light" ? "dark" : "light"
    );
    setTheme({
      ...appTheme("fresh", newPaletteType),
      direction: theme.direction,
    });
  };

  const toggleDirection = (dir) => {
    document.dir = dir;
    setTheme({
      ...theme,
      direction: dir,
      palette: {
        ...theme.palette,
      },
    });
  };

  const muiTheme = createTheme(theme);
  const { Component, pageProps, router } = props; // eslint-disable-line
  const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
  return (
    <div>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css"
          integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N"
          crossOrigin="anonymous"
        />

<script async crossOrigin="anonymous"
          src={`https://www.googletagmanager.com/gtag/js?id=G-LV8VRNXSK6`} />

        <script id="google-analytics" crossOrigin="anonymous"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
                gtag('config', 'G-LV8VRNXSK6', {
                  page_path: window.location.pathname,
                });`,
          }}
        />


        <script id="microsoft-clarity"
          dangerouslySetInnerHTML={{
            __html: `
            (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "fkq79wgg52");
                  `,
          }
          }
        />

      </Head>
      <script src="https://cdn.tailwindcss.com" />
      <script
        src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js"
        integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
        crossOrigin="anonymous"
      />
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-Fy6S3B9q64WdZWQUiU+q4/2Lc9npb8tCaSX9FK7E8HnRr0Jz8D6OP9dO5Vg3Q9ct"
        crossOrigin="anonymous"
      />

      <StylesProvider jss={jss}>
        <ThemeProvider theme={muiTheme}>
          <CssBaseline />
          <LoadingBar
            height={0}
            color={theme.palette.primary.light}
            progress={loading}
            className="top-loading-bar"
          />
          <div id="main-wrap">
            <PageTransition timeout={300} classNames="page-fade-transition">
              <Component
                {...pageProps}
                onToggleDark={toggleDarkTheme}
                onToggleDir={toggleDirection}
                key={router.route}
              />
            </PageTransition>
          </div>
        </ThemeProvider>
      </StylesProvider>
    </div>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
};

MyApp.getInitialProps = async (appContext) => ({
  ...(await App.getInitialProps(appContext)),
});

export default appWithTranslation(MyApp);
