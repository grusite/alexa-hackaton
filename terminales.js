
const data = require('./data.json');


class Terminales{
	constructor(){

	}
	getTerminalsByPrice(amount){
		const thresold = 5;
		return data.items
				.reduce((accumulator, currentValue) => accumulator.concat(currentValue.listTerminals),[])
				.filter(x => x.cuotaMensualConIva >= amount - thresold && x <= x.cuotaMensualConIva <= amount)
				.map(x => ({
					marca: x.marca,
					modelo: x.modelo,
					cuotaMensualConIva: x.cuotaMensualConIva,
					pagoAlContadoConIva: x.pagoAlContadoConIva,
					nombreTarifa: x.nombreTarifa

				}))
	}
	getTerminals(brand,model){
		return data.items
				.reduce((accumulator, currentValue) => accumulator.concat(currentValue.listTerminals),[])
				.filter(x => x.marca.toLowerCase() == brand.toLowerCase())
				.filter(x => x.modelo.split(' ').map(x => x.toLowerCase()).includes(model.toLowerCase())
							|| x.modelo.toLowerCase() == model.toLowerCase())
				.map(x => ({
					marca: x.marca,
					modelo: x.modelo,
					cuotaMensualConIva: x.cuotaMensualConIva,
					pagoAlContadoConIva: x.pagoAlContadoConIva,
					nombreTarifa: x.nombreTarifa

		}))
	}
}

module.exports = new Terminales();
