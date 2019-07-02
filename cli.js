const package = require('./package.json');

const _ = require('lodash');
const chalk = require('chalk');

const {loadDefaultContent, diagnoseDefaultContent} = require('./default-content');

module.exports = async () => {
  const startTimestamp = Date.now();

  const cli = require('commander');
  cli
    .version(package.version)
    .option('--folder [folder]', 'specify folder with default content', '.')
    .option('-d, --diagnose', 'print a list of problems found in default content', true)
    .option('-t, --tips', 'add manual repair tips when using diagnosis mode', false)
    .option('-r, --repair', 'sanitize and overwrite content config', false)
    .option('-v, --version', 'display program version', false)
    .parse(process.argv);

  console.log(chalk.cyan('* Loading default content...'));
  let content;
  try {
    content = await loadDefaultContent(cli.folder);
  } catch(e) {
    console.log(chalk.red('* Error loading default content from specified directory.'));
    return;
  }

  if(cli.diagnose) {
    console.log(chalk.cyan('* Diagnosing...\n'))
    const results = _.filter(diagnoseDefaultContent(content), 'diagnosis');

    _.forEach(results, result => {
      console.log(chalk.yellow(` - ${result.diagnosis}`));
      if(result.diagnosisTip && cli.tips)
        console.log(chalk.grey(` - Tip: ${result.diagnosisTip}`));
      if(result.diagnosisDetails)
        _.forEach(result.diagnosisDetails, detail => console.log(chalk.white(`   - ${detail}`)));
      console.log('');
    });

    let noProblems = false;
    if(_.isEmpty(results)) {
      noProblems = true;
      console.log(chalk.green(` - No problems found!\n`));
    }
  
    const problemCount = noProblems ? chalk.green('0') : chalk.yellow(results.length);
    const duration = `${Date.now() - startTimestamp}ms`;

    console.log(chalk.cyan(`* ${problemCount} problem(s) found in ${duration}. Run with option --repair to attempt automatic repair.`));
    return;
  }

  if(cli.repair) {
    console.log(chalk.redBright('* Repair feature not yet implemented.'));
    return;
  }
};