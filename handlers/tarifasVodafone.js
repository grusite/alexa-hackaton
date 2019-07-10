module.exports = tarifasVodafoneHandler = {
	canHandle(handlerInput) {
		return handlerInput.requestEnvelope.request.type === 'IntentRequest'
				&& handlerInput.requestEnvelope.request.intent.name === 'vodadoneTestOne';
	},
	handle(handlerInput) {
		const speechText = 'Tenemos las mejores tarifas';

		return handlerInput.responseBuilder
				.speak(speechText)
				.withSimpleCard('Hello World', speechText)
				.getResponse();
	},
};
