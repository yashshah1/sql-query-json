import {
  MakeshiftJSONInterface,
  BaseAdapterOptionsInterface,
} from './adapterInterfaces';

import { jsonify, stringify } from './adapterUtils';

class BaseAdapter {
  protected _source: string | MakeshiftJSONInterface;

  protected _serialize: (obj: MakeshiftJSONInterface) => string;
  protected _deserialize: (
    s: string | MakeshiftJSONInterface,
  ) => MakeshiftJSONInterface;

  constructor(
    source: string | MakeshiftJSONInterface,
    options: Partial<BaseAdapterOptionsInterface> = {
      serialize: stringify,
      deserialize: jsonify,
    },
  ) {
    this._source = source;
    this._serialize = options.serialize || stringify;
    this._deserialize = options.deserialize || jsonify;
  }
}

export default BaseAdapter;
