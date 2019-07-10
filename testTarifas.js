
var dataOferta = require("./data-oferta.json");
//var parsed = JSON.parse(rawData);
//console.log(dataOferta.tarifas.particulares); // logs "b1"
//console.log(parsed[1].a2); // logs "b2"

var tarifasParticulares = dataOferta.tarifas.particulares;
var tarifasParticularesConvergente = dataOferta.tarifas.particulares.convergente;
var tarifasParticularesMovil = dataOferta.tarifas.particulares.movil;

//console.log(tarifasParticularesConvergente)
//console.log(tarifasParticularesConvergente.nombre)

var precios = []
var nombreTarifas = []

for (i=0;i<tarifasParticularesConvergente.length;i++){
	//console.log(tarifasParticularesConvergente[i])
		precios.push(tarifasParticularesConvergente[i].precioConIva)
		nombreTarifas.push(tarifasParticularesConvergente[i].nombre)

		if(tarifasParticularesConvergente[i].nombre == 'Vodafone One Mini'){
		console.log(tarifasParticularesConvergente[i].precioConIva)
	}
}

console.log(precios)
console.log(nombreTarifas)