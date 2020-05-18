import chalk from 'chalk';
// import get from './utils/get';

interface CLAInterface {
  [x: string]: unknown;
  port: number;
  host: string;
  watch: boolean | undefined;
  _: string[];
  $0: string;
}

function main(args: CLAInterface): void {
  const resource = args._[0];

  console.log(chalk.red('MAJORRRR WIP, Will break without a warning'));
  console.log(chalk.white(`Loading ${resource}`));
}
export default main;
