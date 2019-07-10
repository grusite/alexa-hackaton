module.exports = vodafoneModeloIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name ===
        "vodafoneTerminalesInit" &&
      handlerInput.requestEnvelope.request.intent.slots.marcaModelo.value &&
      handlerInput.requestEnvelope.request.intent.slots.marcaModelo.value ===
        "modelo"
    );
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak("¿Qué modelo te gusta?")
      .reprompt("¿Qué modelo te gusta?")
      .addElicitSlotDirective("modelo")
      .getResponse();
  }
};
