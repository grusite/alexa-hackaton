const search = require('../../back/tvBack');

module.exports = parrillaTipoContentHandler = {
	canHandle(handlerInput) {
		return handlerInput.requestEnvelope.request.type === 'IntentRequest'
				&& handlerInput.requestEnvelope.request.intent.name === 'vodafoneTv'
				&& handlerInput.requestEnvelope.request.intent.slots.tipo.value;
	},
	handle(handlerInput) {
		const slots = handlerInput.requestEnvelope.request.intent.slots;
		let searchResult, speechText, maxSplice;

		searchResult = search(slots);
		speechText = searchResult && searchResult.length > 0 ? 'Tenemos el siguiente resultado: ' : 'No hemos encontrado nada';
		
		for(let i = 0; i < searchResult.length && i < 3; i++) {
			speechText += `${searchResult[i].title} en ${searchResult[i].canal}, `;
		}

		maxSplice = searchResult.length > 3 ? 3 : searchResult.length;

		searchResult.splice(0, maxSplice);

		handlerInput.attributesManager.setSessionAttributes({searchResult});

		return handlerInput.responseBuilder
			.speak(speechText)
			.reprompt(speechText)
        	.addElicitSlotDirective("tipo")
			.getResponse();
	},
};
