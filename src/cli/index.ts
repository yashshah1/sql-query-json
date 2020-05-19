#! /usr/bin/env node
import yargs from 'yargs';
import main from './main';

// https://github.com/yargs/yargs/blob/master/docs/advanced.md#yargs-parsing-configuration
const argv = yargs
  .usage('Usage: $0 <command> [options]')
  .options({
    port: {
      alias: 'p',
      description: 'Port',
      default: 9274,
    },
    host: {
      alias: 'H',
      description: 'Host',
      default: 'localhost',
    },
    watch: {
      alias: 'W',
      description: 'JSON File',
    },
  })
  .boolean('watch')
  .version(process.env.npm_package_version as string).argv;
main(argv);
