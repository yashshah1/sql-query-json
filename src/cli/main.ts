import fs from 'fs';

import chalk from 'chalk';
import path from 'path';
import type { Application } from 'express';

import * as is from './utils/is';
import { create as createApp } from '../server';
import { deepCompare } from './utils/commons';
import type FileAdapter from '../adapters/fileAdapter';
import type MemoryAdapter from '../adapters/memoryAdapter';
import get from './utils/get';

interface CLAInterface {
  [x: string]: unknown;
  port: number;
  host: string;
  watch: boolean | undefined;
  _: string[];
  $0: string;
}

function main(args: CLAInterface): void {
  let app: Application;
  let dataBase: FileAdapter | MemoryAdapter;
  const source = args._[0];

  console.log(chalk.red('MAJORRRR WIP, Will break without a warning'));
  console.log(chalk.grey(`Loading ${source}`));

  get(source)
    .then(db => {
      console.log(chalk.green.bold('Loading Complete!'));
      app = createApp();
      app.set('db', db);
      dataBase = db;
      console.log(chalk.yellow(`Listening on ${args.host}:${args.port}`));
      app.listen(args.port, args.host);

      (process as NodeJS.EventEmitter).on('uncaughtException', e => {
        if (e.errno === 'EADDRINUSE') {
          console.log(chalk.red(`Cannot bind to ${e.port}`));
        } else throw e;
      });

      if (!args.watch) return;

      if (is.URL(source)) throw "Can't watch URL";

      console.log(`Watching ${source} for changes`);
      const directory = path.dirname(source);

      fs.watch(directory, (event, file) => {
        if (!file) return;
        const watchedFile = path.resolve(directory, file);

        if (watchedFile !== path.resolve(source)) return;
        if (event !== 'change') return;

        let obj;

        try {
          obj = JSON.parse(fs.readFileSync(watchedFile, 'utf-8').trim());
        } catch (e) {
          console.log(chalk.red(`Error reading`));
          throw e;
        }
        const isSame = deepCompare(obj, dataBase.get());
        if (!isSame) {
          app.get('db').read();
          console.log('Reloaded');
        }
      });
    })
    .catch(e => {
      console.log(chalk.red('An unknown error has occured, like expected'));
      console.log(
        chalk.blue(
          `If you figure out what it is, please raise an issue at
  https://github.com/yashshah1/sql-query-json/issues`,
        ),
      );
      console.log(e);
    });
}
export default main;
