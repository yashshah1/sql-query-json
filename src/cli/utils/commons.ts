import { MakeshiftJSONInterface } from '../../adapters/adapterInterfaces';

type ArgType = MakeshiftJSONInterface | number | string;

export function deepCompare(
  obj1: MakeshiftJSONInterface,
  obj2: MakeshiftJSONInterface,
): boolean {
  let leftChain: unknown[], rightChain: unknown[];

  function compare2Objects(x: ArgType, y: ArgType): boolean {
    if (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y))
      return true;

    if (x === y) return true;

    if (!(x instanceof Object && y instanceof Object)) return false;

    if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) return false;

    if (x.constructor !== y.constructor) return false;

    if (x.prototype !== y.prototype) return false;

    if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) return false;

    for (const p in y) {
      if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) return false;
      else if (typeof y[p] !== typeof x[p]) return false;
    }

    for (const p in x) {
      if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) return false;
      else if (typeof y[p] !== typeof x[p]) return false;

      switch (typeof x[p]) {
        case 'object':
          leftChain.push(x);
          rightChain.push(y);

          if (
            !compare2Objects(
              x[p] as MakeshiftJSONInterface,
              y[p] as MakeshiftJSONInterface,
            )
          )
            return false;

          leftChain.pop();
          rightChain.pop();
          break;

        default:
          if (x[p] !== y[p]) return false;
          break;
      }
    }
    return true;
  }

  return compare2Objects(obj1, obj2);
}
