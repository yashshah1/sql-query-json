import fs from 'graceful-fs';
import path from 'path';
import BaseAdapter from './BaseAdapter';
import { MakeshiftJSONInterface } from './AdapterInterfaces';

class FileAdapter extends BaseAdapter {
  private _path: string;
  private _data: MakeshiftJSONInterface;
  private static instance: FileAdapter;

  private constructor(source: string) {
    super(source);
    this._path = path.resolve(this._source as string);
    this._data = this.read();
  }

  static getInstance(source: string): FileAdapter {
    if (!FileAdapter.instance) {
      FileAdapter.instance = new FileAdapter(source);
    }
    return FileAdapter.instance;
  }

  read(): MakeshiftJSONInterface {
    if (fs.existsSync(this._path)) {
      try {
        const data = fs.readFileSync(this._path, 'utf-8').trim();
        this._data = this._deserialize(data);

        // done twice to ensure deep copy
        return this._deserialize(data);
      } catch (e) {
        if (e instanceof SyntaxError)
          e.message = `Malformed JSON\n${e.message}`;
        throw e;
      }
    } else {
      throw 'File does not exist';
    }
  }

  write(data: MakeshiftJSONInterface | string): void {
    fs.writeFileSync(
      this._path,
      typeof data === 'string' ? data : this._serialize(data),
    );
    this._data = this._deserialize(data);
  }
}

export default FileAdapter;
