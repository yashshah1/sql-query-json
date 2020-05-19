import fs from 'fs';
import chalk from 'chalk';
import axios from 'axios';

import * as is from './is';
import type BaseAdapter from '../../adapters/BaseAdapter';
import FileAdapter from '../../adapters/FileAdapter';
import MemoryAdapter from '../../adapters/MemoryAdapter';

function get(source: string): Promise<BaseAdapter> {
  return new Promise((resolve, reject) => {
    if (is.FILE(source)) {
      if (!fs.existsSync(source)) {
        console.log(chalk.yellow('File does not exist :('));
      }
      resolve(FileAdapter.getInstance(source));
    } else if (is.URL(source)) {
      axios
        .get(source)
        .then(res => resolve(new MemoryAdapter(res.data)))
        .catch(err => reject(err));
    } else {
      reject('Unsupported source');
    }
  });
}

export default get;
