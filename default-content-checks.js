const _ = require('lodash');

const util = require('./default-content-util');

// *** REUSED CHECKS ***

const checkMissingValues = (entities, valueKey) => (content) => {
  const result = {};

  entities = _.flatten([entities]);
  const missingValues = util.getMissingValues(
    _.map(entities, entity => _.get(content, entity)),
    valueKey
  );

  if(!_.isEmpty(missingValues)) {
    result.diagnosis = `Entities of type ${_.join(_.map(entities, e => `'${e}'`), ', ')} missing value '${valueKey}' (${missingValues.length})`;
    result.diagnosisDetails = missingValues;
  }

  return result;
};

const checkDuplicateValues = (entities, valueKey) => (content) => {
  const result = {};

  entities = _.flatten([entities]);
  const valueFreq = util.getValueFrequency(
    _.map(entities, entity => _.get(content, entity)),
    valueKey
  );
  const duplicates = _.keys(_.pickBy(valueFreq, freq => freq > 1));

  if(!_.isEmpty(duplicates)) {
    result.diagnosis = `Entities of type ${_.join(_.map(entities, e => `'${e}'`))} have duplicates of value '${valueKey}'`;
    result.diagnosisDetails = duplicates;
  }

  return result;
};

module.exports = [
  checkMissingValues('node', 'uuid'),
  checkMissingValues('node', 'nid'),
  checkMissingValues('paragraph', 'id'),
  checkMissingValues('block_content', 'id'),
  checkMissingValues('paragraph', 'revision_id'),
  checkMissingValues('block_content', 'revision_id'),

  checkDuplicateValues('node', 'nid'),
  checkDuplicateValues('node', 'vid'),
  checkDuplicateValues(['paragraph', 'block_content'], 'revision_id'),
  checkDuplicateValues(['paragraph', 'block_content'], 'id')
];