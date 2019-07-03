const fs = require('fs');
const _ = require('lodash');

const sources = ['node', 'block_content', 'paragraph', 'file'];

const loadDefaultContent = async (dir) => {
  const content = _.zipObject(
    sources,
    _.map(sources, source =>
      _.chain(fs.readdirSync(`${dir}/${source}`))
        .filter(file => _.endsWith(file, '.json'))
        .map(file => fs.readFileSync(`${dir}/${source}/${file}`))
        .map(JSON.parse)
        .value()
    )
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