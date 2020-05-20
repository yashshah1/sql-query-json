/**
 * Designed to work only if the object is an output of JSON.parse(obj)
 * So Only allowed datatypes for value are: number, string, boolean, object and null
 */
export function deepCompare(obj1: any, obj2: any): boolean {
  let leftChain: unknown[], rightChain: unknown[];

  function compare2Objects(x: any, y: any): boolean {
    if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number')
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

          if (!compare2Objects(x[p], y[p])) return false;

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
