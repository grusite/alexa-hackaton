module.exports = DefaultOneHandler = {
	canHandle(handlerInput) {
		return handlerInput.requestEnvelope.request.type === 'IntentRequest'
	},
	handle(handlerInput) {
		const speechText = 'No te entiendo';
		let test = (handlerInput.requestEnvelope.request.type === "IntentRequest" &&
			handlerInput.requestEnvelope.request.intent.name === "vodafoneTarifasMovilesInit" &&
			handlerInput.requestEnvelope.request.intent.slots.juegasOnline &&
			handlerInput.requestEnvelope.request.intent.slots.juegasOnline.resolutions.resolutionsPerAuthority[0].values.value.id === "si" &&
			handlerInput.requestEnvelope.request.intent.slots.contratarTarifa.value == null &&
			handlerInput.requestEnvelope.request.intent.slots.usoDatos.value == null &&
			handlerInput.requestEnvelope.request.intent.slots.isLlamadasMasSeisMinutos.value == null);
		console.log("Prueba no entiendo",JSON.stringify(handlerInput.requestEnvelope.request));
		console.log("test",test);
		return handlerInput.responseBuilder
				.speak(speechText)
				.withSimpleCard('Default', speechText)
				.getResponse();
	},
};
