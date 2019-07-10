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
              .speak("Cuanto te quieres gastar al mes?")
              .reprompt("Cuanto te quieres gastar al mes?")
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
                handlerInput.requestEnvelope.request.intent.slots.precio.value
        );
    },
    handle(handlerInput) {
      let precio = handlerInput.requestEnvelope.request.intent.slots.precio.value;
      const text = `El precio seleccionado es: ${precio}`;
      
      return handlerInput.responseBuilder
                .speak(text)
                .reprompt(text)
                .getResponse();

      try
      {
        const query = terminales.getTerminalsByPrice(parseFloat(precio));
        if(query.length > 0) { 
            const terminal = query[0];
            const text = `He encontrado el terminal ${terminal.marca} ${terminal.modelo} 
            a un precio de ${terminal.cuotaMensualConIva} euros, con la tarifa ${terminal.nombreTarifa}, te interesa?`;
            return handlerInput.responseBuilder
                .speak(text)
                .reprompt(text)
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

module.exports = [vodafonePrecioHandler, vodafonePrecioMovilHandler]

