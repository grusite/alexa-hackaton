module.exports = LaunchRequestHandler = {
	canHandle(handlerInput) {
		const { request } = handlerInput.requestEnvelope;
		return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
	},
	async handle(handlerInput) {
		//let accessToken = this.event.context.System.apiAccessToken;
		const speechText = 'Bienvenido a Vodafone Skill';
		const { responseBuilder } = handlerInput;

		return responseBuilder.speak(speechText).getResponse();

	},
};
