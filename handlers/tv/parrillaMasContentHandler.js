const parrillaMasSiContentHandler = {
	canHandle(handlerInput) {
		return handlerInput.requestEnvelope.request.type === 'IntentRequest'
				&& handlerInput.requestEnvelope.request.intent.name === 'vodafoneTv'
				&& handlerInput.requestEnvelope.request.intent.slots.tipo.value
				&& handlerInput.requestEnvelope.request.intent.slots.mas.value === 'si';
	},
	handle(handlerInput) {
		const tipo = handlerInput.requestEnvelope.request.intent.slots.tipo.value;
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

			return handlerInput.responseBuilder
				.speak(speechText)
				.reprompt(speechText)
				.addElicitSlotDirective("mas")
				.getResponse();
		} else {
			speechText += `ya no tenemos mas ${tipo} que mostrarte. Si te interesa el contenido puedes verlo en Vodafone TV.`;
			
			return handlerInput.responseBuilder
				.speak(speechText)
				.reprompt(speechText)
				.getResponse();
		}
	},
};

const parrillaMasNoContentHandler = {
	canHandle(handlerInput) {
		return handlerInput.requestEnvelope.request.type === 'IntentRequest'
				&& handlerInput.requestEnvelope.request.intent.name === 'vodafoneTv'
				&& handlerInput.requestEnvelope.request.intent.slots.tipo.value
				&& handlerInput.requestEnvelope.request.intent.slots.mas.value === 'no';
	},
	handle(handlerInput) {
		let speechText = '';

		return handlerInput.responseBuilder
			.speak(speechText)
			.getResponse();
	},
};

module.exports = [parrillaMasSiContentHandler, parrillaMasNoContentHandler];