import fs from 'graceful-fs';
import path from 'path';
import BaseAdapter from './baseAdapter';
import {
  MakeshiftJSONInterface,
  BaseAdapterOptionsInterface,
} from './adapterInterfaces';

class FileAdapter extends BaseAdapter {
  private _path: string;
  private _data: MakeshiftJSONInterface;
  private static instance: FileAdapter;

  private constructor(
    source: string,
    options?: Partial<BaseAdapterOptionsInterface>,
  ) {
    super(source, options);
    this._path = path.resolve(this._source as string);
    this._data = this.read();
  }

  static getInstance(
    source: string,
    options?: Partial<BaseAdapterOptionsInterface>,
  ): FileAdapter {
    if (!FileAdapter.instance) {
      FileAdapter.instance = new FileAdapter(source, options);
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
  get(): MakeshiftJSONInterface {
    return this._data;
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
