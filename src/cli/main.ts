import fs from 'fs';
import chalk from 'chalk';
import get from './utils/get';
import path from 'path';

import * as is from './utils/is';
import { create as createApp } from '../server';
import { deepCompare } from './utils/commons';
import BaseAdapter from '../adapters/BaseAdapter';
import FileAdapter from '../adapters/FileAdapter';

interface CLAInterface {
  [x: string]: unknown;
  port: number;
  host: string;
  watch: boolean | undefined;
  _: string[];
  $0: string;
}

function main(args: CLAInterface): void {
  let app;
  let dataBase: BaseAdapter;
  const source = args._[0];

  console.log(chalk.red('MAJORRRR WIP, Will break without a warning'));
  console.log(chalk.grey(`Loading ${source}`));

  get(source)
    .then(db => {
      console.log(chalk.green('DONE!'));

      app = createApp();
      app.set('db', db);

      app.listen(args.port, args.host);

      (process as NodeJS.EventEmitter).on('uncaughtException', e => {
        if (e.errno === 'EADDRINUSE') {
          console.log(chalk.red(`Cannot bind to ${e.port}`));
        } else {
          console.log(chalk.red(`Some random exception has occured`));
          console.log(
            chalk.blue(
              `If you figure out what it is, please raise an issue at
https://github.com/yashshah1/sql-query-json/issues`,
            ),
          );
          process.exit(1);
        }
      });
    })
    .then(() => {
      if (args.watch) {
        console.log(chalk.grey(`Watching`));

        if (is.URL(source)) throw "Can't watch URL";
        const watchedDir = path.dirname(source);
        fs.watch(watchedDir, (event, file) => {
          if (file) {
            const watchedFile = path.resolve(watchedDir, file);
            if (watchedFile === path.resolve(source)) {
              let obj;
              try {
                obj = JSON.parse(fs.readFileSync(watchedFile, 'utf-8').trim());
              } catch (e) {
                console.log(chalk.red(`Error reading`));
                throw e;
              }
              const isSame = deepCompare(obj, dataBase);
              if (!isSame) {
                FileAdapter.getInstance(source).read();
              }
            }
          }
        });
      }
    })
    .catch(e => {
      console.log(e);
      process.exit(1);
    });
}
export default main;
