
const data = require('./data.json');

class Terminales{
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
				.filter(x => x.marca.toLowerCase == brand.toLowerCase())
				.map(x => ({
					marca: x.marca,
					modelo: x.modelo,
					cuotaMensualConIva: x.cuotaMensualConIva,
					pagoAlContadoConIva: x.pagoAlContadoConIva
		}))
	}
}

module.exports = new Terminales();
