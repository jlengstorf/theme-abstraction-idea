const remark = require('remark');
const html = require('remark-html');

module.exports = {
  plugins: [
    // Load the local files only to create the docs schema.
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'placeholder',
        path: `${__dirname}/docs`
      }
    },

    /*
     * Load the `docs` directory without a prefix to load from the docs folder
     * of the site using this theme. This is where the actual docs will be
     * loaded from for creating pages.
     */
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'docs',
        path: 'docs'
      }
    },

    'gatsby-transformer-remark',

    /*
     * We need to make sure that Webpack processes this theme as ES6, so we add
     * this plugin and specify the package name in `modules`.
     */
    {
      resolve: 'gatsby-plugin-compile-es6-packages',
      options: {
        modules: ['gatsby-theme-md-docs']
      }
    }
  ],
  __experimentalThemes: [
    {
      resolve: 'gatsby-adapter-docs',
      options: {
        sourceNodeType: 'MarkdownRemark',
        fieldResolvers: {
          title: node => node.frontmatter.title,
          slug: (node, getNode) => {
            const { createFilePath } = require('gatsby-source-filesystem');
            return createFilePath({ node, getNode });
          },
          content: node => {
            // TODO figure out how to use Remark transformer html field instead
            const md = remark().use(html);
            const { contents } = md.processSync(node.rawMarkdownBody);

            return contents;
          },
          parent: node => node.parent || null
        }
      }
    }
  ]
};
