module.exports = vodafoneModeloContentHandler = {
    canHandle(handlerInput) {
      return (
        handlerInput.requestEnvelope.request.type === "IntentRequest" &&
        handlerInput.requestEnvelope.request.intent.name === "vodafoneTerminalesInit" &&
        handlerInput.requestEnvelope.request.intent.slots.modelo.value &&
        !handlerInput.requestEnvelope.request.intent.slots.precioMarca.value === "marca"
      );
    },
    handle(handlerInput) {
        var query = Terminales.getTerminals(handlerInput.requestEnvelope.request.intent.slots.marca.value, 
            handlerInput.requestEnvelope.request.intent.slots.modelo.value);
        
        const text = `He encontrado el terminal ${query.marca} ${query.modelo} a un precio de ${query.cuotaMensualConIva}`;

      return handlerInput.responseBuilder
        .speak(text)
        .reprompt(text)
        .addElicitSlotDirective("marca")
        .getResponse();
    }
  };
  