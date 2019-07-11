module.exports = LaunchRequestHandler = {
	canHandle(handlerInput) {
		const { request } = handlerInput.requestEnvelope;
		return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
	},
	async handle(handlerInput) {
		//let accessToken = this.event.context.System.apiAccessToken;
		const speechText = "<speak>
			<prosody volume=""x-loud"">Bienvenido,</prosody><break time=""0.1s"" strength=""weak""/>
		estas son algunas de las cosas que puedes hacer con Vodafone.
			Consultar la programación de tu televisión,<break time=""0.1s"" strength=""strong""/> buscar un móvil nuevo o<break time=""0.1s""/> comprobar que la tarifa que más se adapta a ti.
		<break time=""0.1s"" strength=""weak""/>¿Con qué nos ponemos?
	</speak>";
		const { responseBuilder } = handlerInput;

		return responseBuilder.speak(speechText).reprompt(speechText).getResponse();

	},
};
