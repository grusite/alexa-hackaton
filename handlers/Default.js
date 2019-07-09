module.exports = DefaultOneHandler = {
	canHandle(handlerInput) {
		return handlerInput.requestEnvelope.request.type === 'IntentRequest'
	},
	handle(handlerInput) {
		const speechText = 'No te entiento, para más ayuda di help';

		return handlerInput.responseBuilder
				.speak(speechText)
				.withSimpleCard('Default', speechText)
				.getResponse();
	},
};
