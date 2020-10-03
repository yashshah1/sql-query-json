import BaseAdapter from './baseAdapter';
import {
  MakeshiftJSONInterface,
  BaseAdapterOptionsInterface,
} from './adapterInterfaces';

class MemoryAdapter extends BaseAdapter {
  private _data: MakeshiftJSONInterface;
  constructor(
    source: MakeshiftJSONInterface | string,
    options?: Partial<BaseAdapterOptionsInterface>,
  ) {
    super(source, options);
    this._data =
      typeof source === 'string' ? this._deserialize(source) : source;
  }
  read(): MakeshiftJSONInterface {
    return this._data;
  }
  get(): MakeshiftJSONInterface {
    return this._data;
  }
  write(data: MakeshiftJSONInterface): void {
    this._data = data;
  }
}

export default MemoryAdapter;
