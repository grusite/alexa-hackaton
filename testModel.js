const terminales = require('./terminales');
const query3 = terminales.getTerminals('Apple','iPhone');
const query2 = terminales.getTerminalsByPrice(25);

console.log(JSON.stringify(query2));
