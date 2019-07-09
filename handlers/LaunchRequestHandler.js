
module.exports = LaunchRequestHandler = {
	canHandle(handlerInput) {
		return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
	},
	handle(handlerInput) {
		const speechText = 'Bienvenido a Vodafone Skill';

		return handlerInput.responseBuilder
				.speak(speechText)
				.reprompt(speechText)
				.withSimpleCard('Hello World', speechText)
				.getResponse();
	},
};
