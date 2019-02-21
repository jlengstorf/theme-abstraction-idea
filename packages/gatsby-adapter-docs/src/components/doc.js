import React from 'react';

/*
 * The adapter does _nothing_ for presentation. This component must be
 * shadowed by the themes using this data type. As a convenience, we show the
 * available props and data.
 */
const Doc = props => <pre>{JSON.stringify(props, null, 2)}</pre>;

export default Doc;
