const terminales = require('./terminales');
const query3 = terminales.getTerminals('Apple','8');
//const query2 = terminales.getTerminalsByPrice(25);

console.log(JSON.stringify(query3));

/*async function init(){
	const callToOwner = require('./utils/callToOwner');

	let value = await callToOwner();
}
init();

 */
