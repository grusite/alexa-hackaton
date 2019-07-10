module.exports = vodafoneMarcaIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name ===
        "vodafoneTerminalesInit" &&
      handlerInput.requestEnvelope.request.intent.slots.precioMarca.value &&
      handlerInput.requestEnvelope.request.intent.slots.precioMarca.value ===
        "marca"
    );
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak("¿Qué marca te gusta?")
      .reprompt("¿Qué marca te gusta?")
      .addElicitSlotDirective("marca")
      .getResponse();
  }
};
