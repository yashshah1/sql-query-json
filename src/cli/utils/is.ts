// https://github.com/typicode/json-server/blob/master/src/cli/utils/is.js

export const URL = (s: string): boolean => /^https?:/gim.test(s);
export const FILE = (s: string): boolean => !URL(s) && /\.json$/gim.test(s);
