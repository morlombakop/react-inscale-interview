import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Helmet } from 'react-helmet';

import H1 from '../../components/H1';
// import messages from './messages'

const ArticlePage = () => {
  return (
    <div>
      <Helmet>
          <meta
            name="description"
            content="Mbakop Inscale Interview application"
          />
        </Helmet>
        <H1>
          article page...
        </H1>
    </div>
  );
};

export default ArticlePage;
