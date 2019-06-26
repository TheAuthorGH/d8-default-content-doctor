const _ = require('lodash');

const util = require('./default-content-util');

module.exports = [
  // *** NODES ***

  // * Missing NIDs *
  (content) => {
    const result = {};

    const missingNid = util.getMissingValues(content.node, 'nid');
    if(!_.isEmpty(missingNid)) {
      result.diagnosis = `Nodes missing nid (${missingNid.length})`;
      result.diagnosisDetails = missingNid;
    }

    return result;
  },

  // * Duplicate NIDs *
  (content) => {
    const result = {};

    const nidFreq = util.getValueFrequency(content.node, 'nid');
    const duplicates = _.keys(_.pickBy(nidFreq, freq => freq > 1));

    if(!_.isEmpty(duplicates)) {
      result.diagnosis = `Nodes with duplicate nids (${duplicates.length})`;
      result.diagnosisDetails = duplicates;
    }

    return result;
  },

  // * Duplicate VIDs *
  (content) => {
    const result = {};

    const vidFreq = util.getValueFrequency(content.node, 'vid');
    const duplicates = _.keys(_.pickBy(vidFreq, freq => freq > 1));

    if(!_.isEmpty(duplicates)) {
      result.diagnosis = `Nodes with duplicate vids (${duplicates.length})`;
      result.diagnosisDetails = duplicates;
    }

    return result;
  },

  // *** REVISIONS ***

  // * Missing Revision IDs *
  (content) => {
    const result = {};

    const missingRevisionId = util.getMissingValues([content.paragraph, content.block_content], 'revision_id');

    if(!_.isEmpty(missingRevisionId)) {
      result.diagnosis = `Content missing revision_id (${missingRevisionId.length})`;
      result.diagnosisDetails = missingRevisionId;
      result.diagnosisTip = `Next unused revision_id is ${util.getMaxValue([content.paragraph, content.block_content], 'revision_id') + 1}`;
    }

    return result;
  },

  // * Duplicate revision IDs *
  (content) => {
    const result = {};

    const revisionIdFreq = util.getValueFrequency([content.paragraph, content.block_content], 'revision_id');
    const duplicates = _.keys(_.pickBy(revisionIdFreq, freq => freq > 1));

    if(!_.isEmpty(duplicates)) {
      result.diagnosis = `Content with duplicate revision_ids (${duplicates.length})`;
      result.diagnosisDetails = duplicates;
    }

    return result;
  },
];