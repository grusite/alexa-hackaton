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

const vodafonePrecioIntentHandler = {
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

const vodafoneModeloIntentHandler = {
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

module.export = {
  vodafoneTerminalesInitHandler,
  vodafoneMarcaIntentHandler,
  vodafonePrecioIntentHandler,
  vodafoneModeloIntentHandler
};
