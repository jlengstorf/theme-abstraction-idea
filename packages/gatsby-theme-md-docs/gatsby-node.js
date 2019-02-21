const fs = require('fs');

/*
 * To avoid a nasty crash if the theme’s user doesn’t create the `docs`
 * directory before they try to run `gatsby develop`, we check to make sure the
 * directory exists and — if not — we create it.
 */
exports.onPreBootstrap = ({ reporter }) => {
  const dir = 'docs';
  if (!fs.existsSync(dir)) {
    reporter.log(`creating the ${dir} directory`);
    fs.mkdirSync(dir);
  }
};
