module.exports = {
  siteMetadata: {
    title: 'Stylish Docs — A Gatsby Theme',
    description: `
      This theme uses data adapters and Markdown and child themes and all sorts
      of Gatsby themes goodies!
    `,
    sidebarHeading: 'All Documentation:'
  },
  __experimentalThemes: ['gatsby-theme-md-docs'],
  plugins: [
    'gatsby-plugin-emotion',

    /*
     * We need to make sure that Webpack processes this theme as ES6, so we add
     * this plugin and specify the package name in `modules`.
     */
    {
      resolve: 'gatsby-plugin-compile-es6-packages',
      options: {
        modules: ['gatsby-theme-simple-docs']
      }
    }
  ]
};
