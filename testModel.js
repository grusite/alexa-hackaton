const terminales = require('./terminales');
const query = terminales.getTerminalsByPricesLessThan(100);
const query2 = terminales.getTerminalsByPricesGreaterThan(100);
const query3 = terminales.getTerminals('Apple','iPhone XS');

console.log(JSON.stringify(query3));
