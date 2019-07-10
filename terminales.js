
const data = require('./data.json');


class Terminales{
	constructor(){

	}
	getTerminalsByPricesLessThan(amount){
		return data.items[0].listTerminals.map(x => ({
			marca: x.marca,
			modelo: x.modelo,
			cuotaMensualConIva: x.cuotaMensualConIva,
			pagoAlContadoConIva: x.pagoAlContadoConIva
		}))
	}
	getTerminalsByPricesGreaterThan(amount){
		return data.items[0].listTerminals.map(x => ({
			marca: x.marca,
			modelo: x.modelo,
			cuotaMensualConIva: x.cuotaMensualConIva,
			pagoAlContadoConIva: x.pagoAlContadoConIva
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
					toString: () => this.marca + " " + this.modelo + " por el precio de " + this.cuotaMensualConIva
		}))
	}
}

module.exports = new Terminales();
