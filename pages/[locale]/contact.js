import React, { Fragment } from 'react';
import Head from 'next/head';
import brand from '~/public/text/brand';
import { getStaticPaths, makeStaticProps } from '../../lib/getStatic';
// import ContactFrm from '../../components/Forms/Contact';
// import Decoration from '../../components/Forms/Decoration';

import dynamic from 'next/dynamic'
const  ContactFrm = dynamic(() => import('../../components/Forms/Contact'), { ssr: false })
const  Decoration = dynamic(() => import('../../components/Forms/Decoration'), { ssr: false })
// const  Header = dynamic(() => import('../../components/Header'), { ssr: false })

function Contact() {
  return (
    <Fragment>
      <Head>
        <title>
          { brand.medical.name }
          &nbsp; - Contact
        </title>
      </Head>
      <div>
        <Decoration />
        <ContactFrm />
      </div>
    </Fragment>
  );
}

const getStaticProps = makeStaticProps(['common']);
export { getStaticPaths, getStaticProps };

export default Contact;
