module.exports = VodafoneTarifasMovilesInitHandler = {
	canHandle(handlerInput) {
		return (
				handlerInput.requestEnvelope.request.type === 'IntentRequest'
				&& handlerInput.requestEnvelope.request.intent.name === 'vodafoneTarifasMovilesInit' &&
      			handlerInput.requestEnvelope.request.dialogState !== "COMPLETED");
	},
	handle(handlerInput) {
		const speechText = 'Genial. Vamos a ver qué tarifa móvil se adapta mejor a ti. ¿Sueles jugar cada día online?';

		return handlerInput.responseBuilder
      			.addDelegateDirective()
      			.getResponse();	
	},
};

module.export = vodafoneJuegaOnlineIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name ===
        "vodafoneTarifasMovilesInit" &&
      handlerInput.requestEnvelope.request.intent.slots.juegaOnline.value &&
      handlerInput.requestEnvelope.request.intent.slots.juegaOnline.value ===
        "si"
    );
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak("Como buen Gamer, creo que la tarifa que más se adapta es la Ilimitada Movil Total porque lleva la fibra con un 1Gbps simétrico para todos tus dispositivos y datos ilimitados 5G para jugar con la Switch donde queráis")
      .reprompt("Como buen Gamer, creo que la tarifa que más se adapta es la Ilimitada Movil Total porque lleva la fibra con un 1Gbps simétrico para todos tus dispositivos y datos ilimitados 5G para jugar con la Switch donde queráis")
      //.addElicitSlotDirective("precio")
      .getResponse();
  }
};