const search = require('../../back/tvBack');

module.exports = parrillaTipoContentHandler = {
	canHandle(handlerInput) {
		return handlerInput.requestEnvelope.request.type === 'IntentRequest'
				&& handlerInput.requestEnvelope.request.intent.name === 'vodafoneTv'
				&& handlerInput.requestEnvelope.request.intent.slots.tipo.value;
	},
	handle(handlerInput) {
		const slots = handlerInput.requestEnvelope.request.intent.slots;
		let searchResult, searchLength, speechText;

		searchResult = search(slots);
		searchLength = searchLength.length

		if(searchResult && searchLength > 0) {
			let random = 0;
			speechText = 'Tenemos el siguiente resultado: ';

			for(let i = 3; i > 0 && i < searchLength - 1; i--) {
				random = parseInt(Math.random() + searchLength);
				speechText += `${searchResult[random].title} en ${pos.canal}, `;
				searchResult.splice(random, 1);
			}

			speechText += searchResult.length > 3 ? `quiere ver más ${slots.tipo.value}?` : '';
			handlerInput.attributesManager.setSessionAttributes({searchResult});

		} else {
			speechText = 'No hemos encontrado nada';
		}
		

		/*searchResult.forEach(pos => {
			speechText += `${pos.title} en ${pos.canal}, `;
		});*/

		return handlerInput.responseBuilder
			.speak(speechText)
			.reprompt(speechText)
        	.addElicitSlotDirective("tipo")
			.getResponse();
	},
};
