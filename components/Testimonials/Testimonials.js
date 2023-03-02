import React, { useRef, useEffect } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Carousel from 'react-slick';
import { useTranslation } from 'next-i18next';
// import TestimonialCard from '../Cards/Testimonial';
// import TitleIcon from '../Title/WithIcon';
import imgAPI from '~/public/images/imgAPI';
import useStyle from './testi-style';

import dynamic from 'next/dynamic'
const  TestimonialCard = dynamic(() => import('../Cards/Testimonial'), { ssr: false })
const  TitleIcon = dynamic(() => import('../Title/WithIcon'), { ssr: false })


const testiContent = [
  {
    text: 'Babynama is one stop where doctors are so friendly and helpful they give u proper time and solve all ur queries even if it is a silly one',
    avatar: imgAPI.avatar[1],
    name: 'Ruchi Garg',
    title: 'Parent',
    rating: 5,
  },
  {
    text: 'I would highly recommend all mothers to join Babynama and take their subscription as per their requirements. Love Babynama !!',
    avatar: imgAPI.avatar[8],
    name: 'Nikita Sharma',
    title: 'Parent',
    rating: 5,
  },

  {
    text: 'They are always there on time to solve all the queries. I would highly recommend to join Babynama and take their subscriptions',
    avatar: imgAPI.avatar[3],
    name: 'Sakshi',
    title: 'Parent',
    rating: 5,
  },
  {
    text: 'Babynama is helping me a lot with my motherhood journey and I recommend all mothers to join babynama and also take the premium care plan subscription.',
    avatar: imgAPI.avatar[6],
    name: 'Sallwi Gautam',
    title: 'Parent',
    rating: 5,
  },
  {
    text: 'I think this is the very first valuable investment I made for my baby.Thanks to Babynama a wonderful platform for worryfree parenting.',
    avatar: imgAPI.avatar[4],
    name: 'Abinaya',
    title: 'Parent',
    rating: 5,
  },
  {
    text: 'I would recommend every parents if you are seeking 24/7 help in cost effective side though best doctors, try Babynama.',
    avatar: imgAPI.avatar[7],
    name: 'Vaibhavi Singh',
    title: 'Parent',
    rating: 5,
  },
  {
    text: 'Babynama is the best platform for all new moms to deal with all our silly queries as Experienced doctors are right there to help us immediately❤️.',
    avatar: imgAPI.avatar[5],
    name: 'Janvi',
    title: 'Parent',
    rating: 5,
  },
  {
    text: 'The doctors are very polite and helpful and would recommend all mothers to join the same.',
    avatar: imgAPI.avatar[2],
    name: 'Shiksha',
    title: 'Parent',
    rating: 5,
  },
  {
    text: 'They have the qualified doctors and they are able to solve the critical problems. I am suggesting to all parents that you should use Babynama they are the best in this segment.',
    avatar: imgAPI.avatar[9],
    name: 'Raj Singh',
    title: 'Parent',
    rating: 5,
  },
];

function Testimonials() {
  // Theme breakpoints
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const classes = useStyle();

  // Carousel Setting
  const settings = {
    dots: true,
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
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
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

  // Translation function
  const { t } = useTranslation('common');

  // Carousel
  const slider = useRef(null);
  useEffect(() => {
    if (theme.direction === 'ltr' && window.innerWidth > 1279) {
      const limit = window.innerWidth > 1400 ? 3 : 2;
      const lastSlide = Math.floor(testiContent.length - limit);
      slider.current.slickGoTo(lastSlide);
    }
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.carousel}>
        <Carousel ref={slider} {...settings}>
          {' '}
          {isDesktop && (
            <div className={classes.item}>
              <div className={classes.itemPropsFirst} />
              {' '}
            </div>
          )}
          {' '}
          {testiContent.map((item, index) => (
            <div key={index.toString()} className={classes.item}>
              <TestimonialCard
                avatar={item.avatar}
                title={item.title}
                name={item.name}
                text={item.text}
                star={item.rating}
              />
              {' '}
            </div>
          ))}
          {' '}
          {isDesktop && (
            <div className={classes.item}>
              <div className={classes.itemPropsLast} />
              {' '}
            </div>
          )}
          {' '}
        </Carousel>
        {' '}
      </div>
      {' '}
      <div className={classes.floatingTitle}>
        <Container fixed>
          <div className={classes.title}>
            <TitleIcon
              text={t('medical-landing.testimonial_title')}
              icon="format_quote"
            />
          </div>
          {' '}
        </Container>
        {' '}
      </div>
      {' '}
    </div>
  );
}

export default Testimonials;
