const terminales = require('../../terminales');

const vodafonePrecioHandler = {
    canHandle(handlerInput) {
      return (handlerInput.requestEnvelope.request.type === "IntentRequest" &&
              handlerInput.requestEnvelope.request.intent.name === "vodafoneTerminalesInit" &&
              handlerInput.requestEnvelope.request.intent.slots.precioMarca.value &&
              handlerInput.requestEnvelope.request.intent.slots.precioMarca.value === "precio" &&
              handlerInput.requestEnvelope.request.intent.slots.precio.value == null
      );
    },

    handle(handlerInput) {
      return handlerInput.responseBuilder
              .speak("¿Cuánto te quieres gastar al mes?")
              .reprompt("¿Cuánto te quieres gastar al mes?")
              .addElicitSlotDirective("precio")
              .getResponse();
    }
  };
  
  const vodafonePrecioMovilHandler = {
    canHandle(handlerInput) {
        return (handlerInput.requestEnvelope.request.type === "IntentRequest" &&
                handlerInput.requestEnvelope.request.intent.name === "vodafoneTerminalesInit" &&
                handlerInput.requestEnvelope.request.intent.slots.precioMarca.value &&
                handlerInput.requestEnvelope.request.intent.slots.precioMarca.value === "precio" &&
                handlerInput.requestEnvelope.request.intent.slots.precio.value &&
                handlerInput.requestEnvelope.request.intent.slots.interes.value == null
        );
    },
    handle(handlerInput) {
      let precio = handlerInput.requestEnvelope.request.intent.slots.precio.value;

      try
      {
        const query = terminales.getTerminalsByPrice(parseFloat(precio));
        if(query.length > 0) { 
            const terminal = query[0];
            const text = `He encontrado el terminal ${terminal.marca} ${terminal.modelo} 
            a un precio de ${terminal.cuotaMensualConIva} euros, con la tarifa ${terminal.nombreTarifa}, ¿te interesa?`;
            return handlerInput.responseBuilder
                .speak(text)
                .reprompt(text)
                .addElicitSlotDirective("interes")
                .getResponse();
        }
        else
        {
            return handlerInput.responseBuilder
                .speak("No he encontrado ningún movil a ese precio")
                .reprompt("Dime otro precio al mes.")
                .addElicitSlotDirective("precio")
                .getResponse();
        }
      }
      catch (e)
      {
        return handlerInput.responseBuilder
        .speak(e.toString())
        .reprompt(e.toString())
        .getResponse();
      }
    }
  };

  const vodafoneInteresHandler = {
    canHandle(handlerInput) {
        return (handlerInput.requestEnvelope.request.type === "IntentRequest" &&
                handlerInput.requestEnvelope.request.intent.name === "vodafoneTerminalesInit" &&
                handlerInput.requestEnvelope.request.intent.slots.precioMarca.value &&
                handlerInput.requestEnvelope.request.intent.slots.precioMarca.value === "precio" &&
                handlerInput.requestEnvelope.request.intent.slots.precio.value &&
                handlerInput.requestEnvelope.request.intent.slots.interes.value
        );
    },
    handle(handlerInput) {
        const interes = handlerInput.requestEnvelope.request.intent.slots.interes.value;
        let precio = handlerInput.requestEnvelope.request.intent.slots.precio.value;
        
        if(interes == "si") {
            return handlerInput.responseBuilder
                .speak("Me alegro que te interese esta tarifa.")
                .reprompt("Me alegro que te interese esta tarifa.")
                .getResponse();
        } else {
            const query = terminales.getTerminalsByPrice(parseFloat(precio));
            if(query.length > 1) {
                const terminal = query[1];
                const text = `He encontrado el terminal ${terminal.marca} ${terminal.modelo} 
                a un precio de ${terminal.cuotaMensualConIva} euros, con la tarifa ${terminal.nombreTarifa}, ¿te interesa?`;
                return handlerInput.responseBuilder
                    .speak(text)
                    .reprompt(text)
                    .addElicitSlotDirective("interes")
                    .getResponse();
            }
        }
    }
};

module.exports = [vodafonePrecioHandler, vodafonePrecioMovilHandler, vodafoneInteresHandler]

