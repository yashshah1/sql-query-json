import fs from 'fs';
import chalk from 'chalk';
import axios from 'axios';

import * as is from './is';
import FileAdapter from '../../adapters/fileAdapter';
import MemoryAdapter from '../../adapters/memoryAdapter';

function get(source: string): Promise<FileAdapter | MemoryAdapter> {
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
