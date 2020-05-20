import BaseAdapter from './BaseAdapter';
import { MakeshiftJSONInterface } from './AdapterInterfaces';
class MemoryAdapter extends BaseAdapter {
  private _data: MakeshiftJSONInterface;
  constructor(source: MakeshiftJSONInterface | string) {
    super(source);
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
