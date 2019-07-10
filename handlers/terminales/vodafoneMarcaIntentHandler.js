module.exports = vodafoneMarcaIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "vodafoneTerminalesInit" &&
      handlerInput.requestEnvelope.request.intent.slots.precioMarca.value &&
      handlerInput.requestEnvelope.request.intent.slots.precioMarca.value === "marca" &&
      !handlerInput.requestEnvelope.request.intent.slots.marca.value
    );
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak("Tienes alguna marca en mente? Apple, Samsung")
      .reprompt("Tienes alguna marca en mente? Apple, Samsung")
      .addElicitSlotDirective("marca")
      .getResponse();
  }
};
