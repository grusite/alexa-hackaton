const search = require('../back/tvBack');

module.exports = parrillaHandler = {
	canHandle(handlerInput) {
		return handlerInput.requestEnvelope.request.type === 'IntentRequest'
				&& handlerInput.requestEnvelope.request.intent.name === 'vodafoneTv';
	},
	handle(handlerInput) {
		const slots = handlerInput.requestEnvelope.request.intent.slots;
		//const speechText = `Tipo: ${slots['tipo'].value}; Subgenre: ${slots['subgenre'].value}; Tiempo: ${slots['tiempo'].value}; Horario: ${slots['horario'].value}`;
		let searchResult, speechText;

		/*
			"mañana" => ['0601', '1259']
			"tarde" => ['1300', '2059']
			"noche" => ['2100', '0600']
		*/

		search(slots).then(resp => {
			return handlerInput.responseBuilder
					.speak(resp[0].title)
					.withSimpleCard('Hello World', speechText)
					.getResponse();

		}).catch(error => {
			return handlerInput.responseBuilder
				.speak('Erroraco del dragón')
				.withSimpleCard('Hello World', speechText)
				.getResponse();
		});

		/*searchResult = search(slots);

		speechText = searchResult.length > 0 ? 'Tenemos el siguiente resultado: ' : 'No hemos encontrado nada';

		searchResult.forEach(pos => {
			speechText += pos.title + ', ';
		});*/

		// "dime que {tipo} de {subgenre} {orden} {tiempo} a las {horario}"
	},
};
