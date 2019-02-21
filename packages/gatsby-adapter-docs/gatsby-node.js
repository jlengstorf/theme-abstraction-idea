exports.sourceNodes = ({
  emitter,
  actions: { createNode, deleteNode },
  createNodeId,
  createContentDigest
}) => {
  // Create mock nodes/fields to make sure nothing explodes.
  const placeholder = {
    id: createNodeId(`placeholder-doc`),
    title: 'Welcome to Your Stylish Docs Site',
    content: '<p>Add some pages to see your docs here!</p>',
    slug: '/'
  };

  const node = {
    ...placeholder,
    internal: {
      type: 'Doc',
      content: JSON.stringify(placeholder),
      contentDigest: createContentDigest(placeholder)
    }
  };

  const onSchemaUpdate = () => {
    deleteNode({ node });
    emitter.off('SET_SCHEMA', onSchemaUpdate);
  };

  createNode(node);
  emitter.on('SET_SCHEMA', onSchemaUpdate);
};

/*
 * Some notes on this implementation:
 *
 * 1. The schema definition/type checking is, like, babytown frolics. It will
 *    need to be made into a Real Thing™ if we go this direction.
 *
 */
exports.onCreateNode = (
  {
    node,
    getNode,
    actions: { createNode },
    createNodeId,
    createContentDigest,
    reporter
  },
  { fieldResolvers = {}, sourceNodeType }
) => {
  if (!sourceNodeType) {
    reporter.panic(
      `You must specify sourceNodeType in the gatsby-adapter-docs theme options.`
    );
  }

  if (node.internal.type !== sourceNodeType) {
    return;
  }

  // TODO Figure out a better way to define/manage the schema.
  const docsSchema = [
    { name: 'id', type: 'number', required: true },
    { name: 'title', type: 'string', required: true },
    { name: 'slug', type: 'string', required: true },
    { name: 'content', type: 'string', required: true }
  ];

  const docNode = docsSchema.reduce((docNodes, field) => {
    const resolver = fieldResolvers[field.name] || (node => node[field.name]);
    const value = resolver(node, getNode);

    // Check that the supplied value matches the defined schema.
    // TODO Make schema validation more useful/flexible.
    if (typeof value !== field.type) {
      if (field.required && value === null) {
        reporter.panic(
          `Invalid value “${value}” supplied to field “${
            field.name
          }”. Expected a ${field.type}.`
        );
      }
    }

    // Make sure required values are set.
    if (field.required && typeof value === 'undefined') {
      reporter.panic(
        `The field ${field.name} is required, but no value was supplied.`
      );
    }

    return {
      ...docNodes,
      [field.name]: value
    };
  }, {});

  // Actually create the new node with the schema-compliant fields.
  createNode({
    id: createNodeId(`docs-${docNode.id}`),
    title: docNode.title,
    slug: docNode.slug,
    content: docNode.content,
    internal: {
      type: 'Doc',
      content: JSON.stringify(docNode),
      contentDigest: createContentDigest(docNode)
    }
  });
};

/*
 * Create pages for each of the doc nodes. I’m not sure if we’d want to add a
 * way to opt out of page creation, but maybe we could wait until we hear a good
 * argument for _why_ someone would want to do that before we worry about it?
 */
exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const result = await graphql(`
    {
      allDoc {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);

  // Simplify the query result for easier looping.
  const docs = result.data.allDoc.edges.map(({ node }) => node);

  docs.forEach(({ slug }) => {
    createPage({
      path: slug,
      component: require.resolve('./src/templates/doc.js'),
      context: { slug }
    });
  });
};
