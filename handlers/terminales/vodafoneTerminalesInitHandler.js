const vodafoneTerminalesInitHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name ===
        "vodafoneTerminalesInit" &&
      handlerInput.requestEnvelope.request.dialogState !== "COMPLETED"
    );
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder.addDelegateDirective().getResponse();
  }
};


const vodafoneMarcaIntentHandler = {
  canHandle(handlerInput) {
    return (
            handlerInput.requestEnvelope.request.type === "IntentRequest" &&
            handlerInput.requestEnvelope.request.intent.name === "vodafoneTerminalesInit" &&
            handlerInput.requestEnvelope.request.intent.slots.precioMarca.value &&
            handlerInput.requestEnvelope.request.intent.slots.precioMarca.value === "marca" &&
            handlerInput.requestEnvelope.request.intent.slots.marca.value == null
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

const vodafoneMarcaContentHandler = {
  canHandle(handlerInput) {
    return (
            handlerInput.requestEnvelope.request.type === "IntentRequest" &&
            handlerInput.requestEnvelope.request.intent.name === "vodafoneTerminalesInit" &&
            handlerInput.requestEnvelope.request.intent.slots.precioMarca.value &&
            handlerInput.requestEnvelope.request.intent.slots.precioMarca.value === "marca" &&
            handlerInput.requestEnvelope.request.intent.slots.marca.value &&
            handlerInput.requestEnvelope.request.intent.slots.modelo.value == null
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
module.exports = [vodafoneTerminalesInitHandler,vodafoneMarcaIntentHandler,vodafoneMarcaContentHandler]
