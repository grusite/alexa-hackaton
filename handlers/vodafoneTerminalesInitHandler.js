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
