/*
 * NOTE: This file has been temporarily renamed to take it out of the
 * component shadowing chain until gatsbyjs/gatsby#11951 is resolved.
 * See https://github.com/gatsbyjs/gatsby/issues/11951
 */
import React from 'react';

const Doc = props => (
  <React.Fragment>
    <h1>This Is the Default Adapter Component</h1>
    <p>The props and data passed to this component are:</p>
    <pre>{JSON.stringify(props, null, 2)}</pre>
  </React.Fragment>
);

export default Doc;
