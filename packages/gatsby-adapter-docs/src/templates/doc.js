import React from 'react';
import { graphql } from 'gatsby';
import Doc from '../components/doc';

/*
 * Because we’ve normalized the data input into a generic `Doc` node, we can
 * query for all the known fields in the schema, then pass those directly into
 * the main `Doc` component.
 */
export const query = graphql`
  query($slug: String!) {
    doc(slug: { eq: $slug }) {
      id
      title
      content
      slug
    }
  }
`;

const DocTemplate = ({ data: { doc } }) => <Doc {...doc} />;

export default DocTemplate;
