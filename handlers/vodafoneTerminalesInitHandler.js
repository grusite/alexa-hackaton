const vodafoneTerminalesInitHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "IntentRequest"
      && handlerInput.requestEnvelope.request.intent.name === "vodafoneTerminalesInit"
      && handlerInput.requestEnvelope.request.dialogState !== 'COMPLETED';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .addDelegateDirective()
      .getResponse();
  }
};

const vodafoneMarcaIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "IntentRequest"
      && handlerInput.requestEnvelope.request.intent.name === "vodafoneTerminalesInit"
      && handlerInput.requestEnvelope.request.intent.slots.marcaModelo.value 
      && handlerInput.requestEnvelope.request.intent.slots.marcaModelo.value === 'marca'
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak('¿Qué marca te gusta?')
      .reprompt('¿Qué marca te gusta?')
      .addElicitSlotDirective('marcaContent')
      .getResponse();
  }
};

const vodafonePrecioIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "IntentRequest"
      && handlerInput.requestEnvelope.request.intent.name === "vodafoneTerminalesInit"
      && handlerInput.requestEnvelope.request.intent.slots.marcaModelo.value 
      && handlerInput.requestEnvelope.request.intent.slots.marcaModelo.value === 'precio'
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak('¿Cuanto te quieres gastar?')
      .reprompt('¿Cuanto te quieres gastar?')
      .addElicitSlotDirective('precioContent')
      .getResponse();
  }
};

const vodafoneModeloIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "IntentRequest"
      && handlerInput.requestEnvelope.request.intent.name === "vodafoneTerminalesInit"
      && handlerInput.requestEnvelope.request.intent.slots.marcaModelo.value 
      && handlerInput.requestEnvelope.request.intent.slots.marcaModelo.value === 'modelo'
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak('¿Qué modelo te gusta?')
      .reprompt('¿Qué modelo te gusta?')
      .addElicitSlotDirective('modeloContent')
      .getResponse();
  }
};


