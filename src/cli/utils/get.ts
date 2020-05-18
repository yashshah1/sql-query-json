import fs from 'fs';
import chalk from 'chalk';
import FileAsync from 'lowdb/adapters/FileAsync';
import Memory from 'lowdb/adapters/Memory';
import low from 'lowdb';
import axios from 'axios';

import * as is from './is';

export default function main(source: string): Promise<unknown> {
  return new Promise((resolve, reject) => {
    if (is.FILE(source)) {
      if (!fs.existsSync(source)) {
        console.log(chalk.red(`${source} does not exist`));
        return reject('Error reading file');
      }
      resolve(low(new FileAsync(source)));
    } else if (is.URL(source)) {
      console.log(
        chalk.yellow(
          'Source to watch is a URL, Write operations will not reflect any changes',
        ),
      );
      axios
        .get(source)
        .then(({ data }) => resolve(low(new Memory(data))))
        .catch(err => reject(err));
    } else {
      reject(`Invalid Source ${source}`);
    }
  });
}
