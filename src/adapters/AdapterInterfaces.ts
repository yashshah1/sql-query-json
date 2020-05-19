export interface MakeshiftJSONInterface {
  [key: string]:
    | string
    | number
    | boolean
    | null
    | MakeshiftJSONInterface
    | MakeshiftJSONInterface[];
}

export interface BaseAdapterOptionsInterface {
  serialize: (obj: MakeshiftJSONInterface) => string;
  deserialize: (s: string) => MakeshiftJSONInterface;
}
