const _ = require('lodash');
const chalk = require('chalk');

const {loadDefaultContent, diagnoseDefaultContent} = require('./default-content');

module.exports = async () => {
  const startTimestamp = Date.now();

  const cli = require('commander');
  cli
    .option('-f, --folder [folder]', 'Specify folder with default content [current dir]', '.')
    .option('-d, --diagnose', 'Prints diagnosis checks about default config.', true)
    .option('-r, --repair', 'Sanitizes and overwrites content config')
    .parse(process.argv);
  
  console.log(chalk.cyan('* Loading default content...'));
  const content = await loadDefaultContent(cli.folder);

  if(cli.diagnose) {
    console.log(chalk.cyan('* Diagnosing...\n'))
    const results = _.filter(diagnoseDefaultContent(content), 'diagnosis');

    _.forEach(results, result => {
      console.log(chalk.yellow(` - ${result.diagnosis}`));
      // TODO improve tip display.
      if(result.diagnosisTip)
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

    console.log(chalk.cyan(`* ${problemCount} problem(s) found in ${duration}.`));
    return;
  }

  if(cli.repair) {
    console.log(chalk.redBright('* Repair feature not yet implemented.'));
    return;
  }
};