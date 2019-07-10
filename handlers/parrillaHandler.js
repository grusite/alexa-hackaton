module.exports = tarifasVodafoneHandler = {
	canHandle(handlerInput) {
		return handlerInput.requestEnvelope.request.type === 'IntentRequest'
				&& handlerInput.requestEnvelope.request.intent.name === 'vodafoneTv';
	},
	handle(handlerInput) {
		const speechText = 'Estás en la parrilla';

		const slots = handlerInput.requestEnvelope.request.slots;

		// "dime que {tipo} de {subgenre} {orden} {tiempo} a las {horario}"

		console.log(slots['tipo']);
		console.log(slots['subgenre']);
		console.log(slots['tiempo']);
		console.log(slots['horario']);
		

		return handlerInput.responseBuilder
				.speak(speechText)
				.withSimpleCard('Hello World', speechText)
				.getResponse();
	},
};
