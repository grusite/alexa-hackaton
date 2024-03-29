const parrillaMasSiContentHandler = {
	canHandle(handlerInput) {
		const slots = handlerInput.requestEnvelope.request.intent.slots;

		return handlerInput.requestEnvelope.request.type === 'IntentRequest'
			&& handlerInput.requestEnvelope.request.intent.name === 'vodafoneTv'
			&& slots.tipo.value
			&& (slots.mas.value === 'si' || slots.mas.value === 'sí')
			&& !slots.volver.value
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
			speechText += `ya no tenemos mas ${tipo} que mostrarte. .`;

			slots.mas.value = null;

			return handlerInput.responseBuilder
				.speak(speechText)
				.withShouldEndSession(true)
				.getResponse();
		}
	},
};

const parrillaMasNoContentHandler = {
	canHandle(handlerInput) {
		const slots = handlerInput.requestEnvelope.request.intent.slots;

		return handlerInput.requestEnvelope.request.type === 'IntentRequest'
				&& handlerInput.requestEnvelope.request.intent.name === 'vodafoneTv'
				&& (((slots.mas.value === 'si' || slots.mas.value === 'sí' ) && (slots.volver.value === 'no' || slots.volver.value === 'nó')) ||
					((slots.mas.value === 'no' || slots.mas.value === 'nó') || (slots.volver.value === 'nó' || slots.volver.value === 'no')))
	},
	handle(handlerInput) {
		const slots = handlerInput.requestEnvelope.request.intent.slots;
		const isPlural = /s$/.test(slots.tipo.value);

		let speechText = `Disfruta de ${isPlural ? 'tus' : 'tu'} ${slots.tipo.value}!`;

		return handlerInput.responseBuilder
			.speak(speechText)
			.withShouldEndSession(true)
			.getResponse();
	},
};

module.exports = [parrillaMasSiContentHandler, parrillaMasNoContentHandler];
