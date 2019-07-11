module.exports = CancelAndStopIntentHandler = {
	canHandle(handlerInput) {
		return handlerInput.requestEnvelope.request.type === 'IntentRequest'
				&& (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
						|| handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
	},
	handle(handlerInput) {
		const speechText = '<speak><prosody rate="fast">Hasta luego Maricarmen</prosody></speak>';

		return handlerInput.responseBuilder
				.speak(speechText)
				.getResponse();
	},
};
