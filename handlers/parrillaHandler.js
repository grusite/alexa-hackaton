module.exports = tarifasVodafoneHandler = {
	canHandle(handlerInput) {
		return handlerInput.requestEnvelope.request.type === 'IntentRequest'
				&& handlerInput.requestEnvelope.request.intent.name === 'vodafoneTv';
	},
	handle(handlerInput) {
		const slots = handlerInput.requestEnvelope.request.intent.slots;
		const speechText = `Tipo: ${slots['tipo'].value}; Subgenre: ${slots['subgenre'].value}; Tiempo: ${slots['tiempo'].value}; Horario: ${slots['horario'].value}`;


		// "dime que {tipo} de {subgenre} {orden} {tiempo} a las {horario}"

		return handlerInput.responseBuilder
				.speak(speechText)
				.withSimpleCard('Hello World', speechText)
				.getResponse();
	},
};
