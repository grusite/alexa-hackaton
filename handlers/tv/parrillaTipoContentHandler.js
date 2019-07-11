const search = require('../../back/tvBack');

module.exports = parrillaTipoContentHandler = {
	canHandle(handlerInput) {
		return handlerInput.requestEnvelope.request.type === 'IntentRequest'
				&& handlerInput.requestEnvelope.request.intent.name === 'vodafoneTv'
				&& handlerInput.requestEnvelope.request.intent.slots.tipo.value
				&& !handlerInput.requestEnvelope.request.intent.slots.mas.value;
	},
	handle(handlerInput) {
		const slots = handlerInput.requestEnvelope.request.intent.slots;
		let searchResult, speechText;

		searchResult = search(slots);
		speechText = searchResult.length > 0 ? 'Tenemos el siguiente resultado: ' : 'No hemos encontrado nada';
		searchResult.forEach((pos, i) => {
			if(i < 3)
				speechText += `${pos.title} en ${pos.canal}, `;
		});

		searchResult.splice(0, 3);

		if(searchResult.length > 0) {
			speechText += `quieres ver mas ${slots.tipo.value}?`;
			
			handlerInput.attributesManager.setSessionAttributes({searchResult});
			return handlerInput.responseBuilder
				.speak(speechText)
				.reprompt(speechText)
				.addElicitSlotDirective("mas")
				.getResponse();
		} else {
			speechText += `no hay más ${slots.tipo.value} en este momento. Quieres ver otra cosa?`;
			
			return handlerInput.responseBuilder
				.speak(speechText)
				.reprompt(speechText)
				.addElicitSlotDirective("tipo")
				.getResponse();
		}

	},
};
