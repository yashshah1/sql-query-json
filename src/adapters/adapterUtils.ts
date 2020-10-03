import { MakeshiftJSONInterface } from './adapterInterfaces';

export const stringify = (obj: MakeshiftJSONInterface | string): string =>
  typeof obj === 'string' ? (obj as string) : JSON.stringify(obj, null, 2);

export const jsonify = (
  data: string | MakeshiftJSONInterface,
): MakeshiftJSONInterface =>
  typeof data === 'string' ? JSON.parse(data) : data;
