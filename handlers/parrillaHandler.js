module.exports = tarifasVodafoneHandler = {
	canHandle(handlerInput) {
		return handlerInput.requestEnvelope.request.type === 'IntentRequest'
				&& handlerInput.requestEnvelope.request.intent.name === 'vodafoneTv';
	},
	handle(handlerInput) {
		const speechText = `Tipo: ${slots['tipo']}; Subgenre: ${slots['subgenre']}; Tiempo: ${slots['tiempo']}; Horario: ${slots['horario']}`;

		const slots = handlerInput.requestEnvelope.request.intent.slots;

		// "dime que {tipo} de {subgenre} {orden} {tiempo} a las {horario}"

		return handlerInput.responseBuilder
				.speak(speechText)
				.withSimpleCard('Hello World', speechText)
				.getResponse();
	},
};
