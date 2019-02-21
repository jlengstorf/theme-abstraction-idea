import React from 'react';
import Helmet from 'react-helmet';
import Layout from './layout';

const Doc = ({ title, content }) => {
  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </Layout>
  );
};

export default Doc;
