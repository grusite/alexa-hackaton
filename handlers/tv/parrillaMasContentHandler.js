const parrillaMasSiContentHandler = {
	canHandle(handlerInput) {
		return handlerInput.requestEnvelope.request.type === 'IntentRequest'
			&& handlerInput.requestEnvelope.request.intent.name === 'vodafoneTv'
			&& handlerInput.requestEnvelope.request.intent.slots.tipo.value
			&& handlerInput.requestEnvelope.request.intent.slots.mas.value === 'si'
	},
	handle(handlerInput) {
		const slots = handlerInput.requestEnvelope.request.intent.slots; 
		const tipo = slots.tipo.value;
		const sessionContent = handlerInput.attributesManager.getSessionAttributes().searchResult;
		let speechText;

		speechText = sessionContent.length > 0 ? 'Tenemos el siguiente resultado: ' : 'No hemos encontrado nada';
		sessionContent.forEach((pos, i) => {
			if(i < 3)
				speechText += `${pos.title} en ${pos.canal}, `;
		});

		sessionContent.splice(0, 3);

		if(sessionContent.length > 0) {
			speechText += `quieres ver mas ${tipo}?`;
			handlerInput.attributesManager.setSessionAttributes({"searchResult": sessionContent});

			slots.volver.value = null;

			return handlerInput.responseBuilder
				.speak(speechText)
				.reprompt(speechText)
				.addElicitSlotDirective("mas")
				.getResponse();
		} else {
			speechText += `ya no tenemos mas ${tipo} que mostrarte. Quieres ver otra cosa?.`;

			slots.mas.value = null;
			
			return handlerInput.responseBuilder
				.speak(speechText)
				.addElicitSlotDirective("volver")
				.getResponse();
		}
	},
};

const parrillaMasNoContentHandler = {
	canHandle(handlerInput) {
		return handlerInput.requestEnvelope.request.type === 'IntentRequest'
				&& handlerInput.requestEnvelope.request.intent.name === 'vodafoneTv'
				&& (handlerInput.requestEnvelope.request.intent.slots.mas.value === 'no'
					|| handlerInput.requestEnvelope.request.intent.slots.volver.value == 'no'));
	},
	handle(handlerInput) {
		let speechText = 'Pues ya estaríamos';

		return handlerInput.responseBuilder
			.speak(speechText)
			.withShouldEndSession(true)
			.getResponse();
	},
};

module.exports = [parrillaMasSiContentHandler, parrillaMasNoContentHandler];