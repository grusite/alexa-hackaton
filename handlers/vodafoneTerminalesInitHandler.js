module.exports = vodafoneTerminalesInitHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name ===
        "vodafoneTerminalesInit"
    );
  },
  handle(handlerInput) {
    const speechText = "Tenemos muchas tarifas buenas!!!";

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard("Hello World", speechText)
      .getResponse();
  }
};

module.exports = vodafoneTerminalesMarcaHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name ===
        "vodafoneTerminalesMarca"
    );
  },

  handle(handlerInput) {
    const speechText = `El ${modelo} te sale por ${query.cuotaMensualConIva} con la tarifa Ilimitada`;
    const reprontText = "¿Quieres cambiar de tarifa?";
    const marca = handlerInput.attributesManager.getRequestAttributes("marca");
    const modelo = handlerInput.attributesManager.getRequestAttributes("modelo");
    const precio = handlerInput.attributesManager.getRequestAttributes("precio");
    var query = Terminales.getTerminals(marca, modelo);

    return handlerInput.responseBuilder
				.speak(speechText)
				.reprompt(reprontText)
				.withSimpleCard(speechText)
				.getResponse();
  }
}
