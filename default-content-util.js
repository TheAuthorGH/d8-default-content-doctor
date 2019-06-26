const _ = require('lodash');

const util = {};

util.getUUID = (entity) => entity.uuid[0].value;

util.getValues = (entities, valueKey) => {
  return _.transform(_.flatten(entities), (accum, entity) => {
    const value = entity[valueKey];
    accum[util.getUUID(entity)] = value && value[0].value;
  }, {});
};

util.getMissingValues = (entities, valueKey) => {
  return _.chain(util.getValues(entities, valueKey)).omitBy().keys().value();
};

util.getMaxValue = (entities, valueKey) => {
  return _.chain(util.getValues(entities, valueKey)).values().map(Number).max().value();
};

util.getValueFrequency = (entities, valueKey) => {
  return _.chain(util.getValues(entities, valueKey))
    .values()
    .filter()
    .countBy()
    .value();
};

module.exports = util;