const search = require('../back/tvBack');
const channelData = require('../data/sta.json');

module.exports = parrillaHandler = {
	canHandle(handlerInput) {
		return handlerInput.requestEnvelope.request.type === 'IntentRequest'
				&& handlerInput.requestEnvelope.request.intent.name === 'vodafoneTv';
	},
	handle(handlerInput) {
		//const speechText = `Tipo: ${slots['tipo'].value}; Subgenre: ${slots['subgenre'].value}; Tiempo: ${slots['tiempo'].value}; Horario: ${slots['horario'].value}`;
		const slots = handlerInput.requestEnvelope.request.intent.slots;
		let searchResult, speechText;
		/*
			"mañana" => ['0601', '1259']
			"tarde" => ['1300', '2059']
			"noche" => ['2100', '0600']
		*/

		//const kk =  search(slots);

		
		searchResult = search(slots);
		speechText = searchResult.length > 0 ? 'Tenemos el siguiente resultado: ' : 'No hemos encontrado nada';
		searchResult.forEach(pos => {
			speechText += `${pos.title} en ${channelData[pos.canal].name}, `;
		});

		return handlerInput.responseBuilder
			.speak(speechText)
			.withSimpleCard('Hello World', speechText)
			.getResponse()
	},
};
