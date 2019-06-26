const fs = require('fs');
const _ = require('lodash');

const sources = ['node', 'block_content', 'paragraph', 'file'];

const loadDefaultContent = async (dir) => {
  const content = _.zipObject(
    sources,
    _.map(sources, source => {
      return _.map(
        fs.readdirSync(`${dir}/${source}`),
        file => JSON.parse(fs.readFileSync(`${dir}/${source}/${file}`))
      );
    })
  );
  return content;
};

const diagnoseDefaultContent = (content) => {
  const checks = require('./default-content-checks');

  const results = _.map(checks, check => check(content));

  return results;
};

module.exports = {
  sources,
  loadDefaultContent,
  diagnoseDefaultContent
};