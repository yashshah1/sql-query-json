const { Parser } = require('node-sql-parser');
const parser = new Parser();
const ast = parser.astify(
  'SELECT a as A, b as B FROM t where a in (select a from C)',
); // mysql sql grammer parsed by default

console.log(JSON.stringify(ast, null, 2));
