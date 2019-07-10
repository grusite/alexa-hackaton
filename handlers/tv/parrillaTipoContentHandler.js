const search = require('../../back/tvBack');

module.exports = parrillaTipoContentHandler = {
	canHandle(handlerInput) {
		return handlerInput.requestEnvelope.request.type === 'IntentRequest'
				&& handlerInput.requestEnvelope.request.intent.name === 'vodafoneTv'
				&& handlerInput.requestEnvelope.request.intent.slots.tipo.value;
	},
	handle(handlerInput) {
		const slots = handlerInput.requestEnvelope.request.intent.slots;
		let searchResult, speechText;

		searchResult = search(slots);
		speechText = searchResult && searchResult.length > 0 ? 'Tenemos el siguiente resultado: ' : 'No hemos encontrado nada';
		searchResult.forEach(pos => {
			speechText += `${pos.title} en ${pos.canal}, `;
		});

		return handlerInput.responseBuilder
			.speak(speechText)
			.reprompt(speechText)
        	.addElicitSlotDirective("tipo")
			.getResponse();
	},
};
