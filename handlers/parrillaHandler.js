const search = require('../back/tvBack');


module.exports = parrillaHandler = {
	canHandle(handlerInput) {
		return handlerInput.requestEnvelope.request.type === 'IntentRequest'
				&& handlerInput.requestEnvelope.request.intent.name === 'vodafoneTv';
	},
	handle(handlerInput) {
		const slots = handlerInput.requestEnvelope.request.intent.slots;
		let searchResult, speechText;
		searchResult = search(slots);
		speechText = searchResult.length > 0 ? 'Tenemos el siguiente resultado: ' : 'No hemos encontrado nada';
		searchResult.forEach(pos => {
			speechText += `${pos.title} en ${pos.canal}, `;
		});

		return handlerInput.responseBuilder
			.speak(speechText)
			.withSimpleCard('Hello World', speechText)
			.getResponse()
	},
};
