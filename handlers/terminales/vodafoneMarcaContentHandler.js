module.exports = vodafoneMarcaContentHandler = {
    canHandle(handlerInput) {
      return (
        handlerInput.requestEnvelope.request.type === "IntentRequest" &&
        handlerInput.requestEnvelope.request.intent.name === "vodafoneTerminalesInit" &&
        handlerInput.requestEnvelope.request.intent.slots.precioMarca.value &&
        handlerInput.requestEnvelope.request.intent.slots.precioMarca.value === "marca" &&
        handlerInput.requestEnvelope.request.intent.slots.marca.value &&
        !handlerInput.requestEnvelope.request.intent.slots.modelo.value
      );
    },
    handle(handlerInput) {
      return handlerInput.responseBuilder
        .speak("¿Qué modelo quieres?")
        .reprompt("¿Qué modelo quieres?")
        .addElicitSlotDirective("modelo")
        .getResponse();
    }
  };
  