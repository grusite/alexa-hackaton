const search = require('../../back/tvBack');

module.exports = parrillaTipoContentHandler = {
	canHandle(handlerInput) {
		const slots = handlerInput.requestEnvelope.request.intent.slots;

		return handlerInput.requestEnvelope.request.type === 'IntentRequest'
				&& handlerInput.requestEnvelope.request.intent.name === 'vodafoneTv'
				&& slots.tipo.value
				&& ((!slots.mas.value || (slots.volver.value === 'sí' || slots.volver.value === 'si')) ||
					((slots.mas.value === 'si' || slots.mas.value === 'sí') && (slots.volver.value === 'sí' || slots.volver.value === 'si')));
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

			slots.volver.value = null;

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
				.addElicitSlotDirective("volver")
				.getResponse();
		}


	},
};
