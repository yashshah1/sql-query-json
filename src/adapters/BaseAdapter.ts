import {
  MakeshiftJSONInterface,
  BaseAdapterOptionsInterface,
} from './AdapterInterfaces';

const stringify = (obj: MakeshiftJSONInterface | string): string =>
  typeof obj === 'string' ? (obj as string) : JSON.stringify(obj, null, 2);

const jsonify = (
  data: string | MakeshiftJSONInterface,
): MakeshiftJSONInterface =>
  typeof data === 'string' ? JSON.parse(data) : data;

class BaseAdapter {
  protected _source: string | MakeshiftJSONInterface;
  protected _serialize: Function;
  protected _deserialize: Function;
  constructor(
    source: string | MakeshiftJSONInterface,
    options: BaseAdapterOptionsInterface = {
      serialize: stringify,
      deserialize: jsonify,
    },
  ) {
    this._source = source;
    this._serialize = options.serialize;
    this._deserialize = options.deserialize;
  }
}

export default BaseAdapter;
