module.exports = vodafonePrecioIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name ===
        "vodafoneTerminalesInit" &&
      handlerInput.requestEnvelope.request.intent.slots.precioMarca.value &&
      handlerInput.requestEnvelope.request.intent.slots.precioMarca.value ===
        "precio"
    );
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak("¿Cuanto te quieres gastar?")
      .reprompt("¿Cuanto te quieres gastar?")
      .addElicitSlotDirective("precio")
      .getResponse();
  }
};
