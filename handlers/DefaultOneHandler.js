module.exports = DefaultOneHandler = {
	canHandle(handlerInput) {
		return handlerInput.requestEnvelope.request.type === 'IntentRequest'
	},
	handle(handlerInput) {
		const speechText = 'No te entiendo';
		console.log("Prueba no entiendo",JSON.stringify(handlerInput.requestEnvelope.request));
		return handlerInput.responseBuilder
				.speak(speechText)
				.withSimpleCard('Default', speechText)
				.getResponse();
	},
};
