module.exports = VodafoneTarifasMovilesInitHandler = {
	canHandle(handlerInput) {
		return handlerInput.requestEnvelope.request.type === 'IntentRequest'
				&& handlerInput.requestEnvelope.request.intent.name === 'vodafoneTarifasMovilesInit';
	},
	handle(handlerInput) {
		const speechText = 'Genial. Vamos a ver qué tarifa móvil se adapta mejor a ti. ¿Sueles jugar cada día online?';

		return handlerInput.responseBuilder
				.speak(speechText)
				.withSimpleCard('Hello World', speechText)
				.getResponse();
	},
};
