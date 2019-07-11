/*
const terminales = require('../../terminales');
const callToOwner = require("../../utils/callToOwner");

const VodafoneOrderIntentHandler = {
    canHandle(handlerInput) {
        return (
            handlerInput.requestEnvelope.request.type === "IntentRequest" &&
            handlerInput.requestEnvelope.request.intent.name === "vodafoneTerminalesInit" &&
            handlerInput.requestEnvelope.request.intent.slots.precioMarca.value &&
            handlerInput.requestEnvelope.request.intent.slots.precioMarca.value === "precio" &&
            handlerInput.requestEnvelope.request.intent.slots.interes.value === "si"
        );
    },
    async handle(handlerInput){

        await callToOwner(handlerInput);

        return handlerInput.responseBuilder
            .speak("<speak>Estamos poniendote en contacto con un agente, atento a tu móvil... <audio src=\"https://hackathon-vf.s3-eu-west-1.amazonaws.com/jingle.mp3\"></audio></speak>")
            .withShouldEndSession(true)
            .getResponse();
    }
};

const vodafonePrecioHandler = {
    canHandle(handlerInput) {
      return (handlerInput.requestEnvelope.request.type === "IntentRequest" &&
              handlerInput.requestEnvelope.request.intent.name === "vodafoneTerminalesInit" &&
              handlerInput.requestEnvelope.request.intent.slots.precioMarca.value &&
              handlerInput.requestEnvelope.request.intent.slots.precioMarca.value === "precio" &&
              handlerInput.requestEnvelope.request.intent.slots.precio.value === null
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

        const attributesManager = handlerInput.attributesManager;

        const sessionAttributes = attributesManager.getSessionAttributes()
        sessionAttributes.intentos = sessionAttributes.intentos ? sessionAttributes.intentos + 1 : 1
        if(interes == "si") {
            return handlerInput.responseBuilder
                .speak("¡Genial! En unos instantes un asesor de Vodafone se pondrá en contacto contigo. Pero mientras... ¡disfruta!")
                .reprompt("¡Genial! En unos instantes un asesor de Vodafone se pondrá en contacto contigo. Pero mientras... ¡disfruta!")
                .getResponse();
        } else {
            const query = terminales.getTerminalsByPrice(parseFloat(precio));
            if(query.length > sessionAttributes.intentos) {
                const terminal = query[sessionAttributes.intentos];
                const text = `He encontrado el terminal ${terminal.marca} ${terminal.modelo}
                a un precio de ${terminal.cuotaMensualConIva} euros, con la tarifa ${terminal.nombreTarifa}, ¿te interesa?`;
                return handlerInput.responseBuilder
                    .speak(text)
                    .reprompt(text)
                    .addElicitSlotDirective("interes")
                    .getResponse();
            }
            else{
                return handlerInput.responseBuilder
                        .speak('Un asesor de Vodafone se pondrá en contacto contigo. Pero mientras... ¡disfruta!')
                        .reprompt('Un asesor de Vodafone se pondrá en contacto contigo. Pero mientras... ¡disfruta!')
                        .getResponse();
            }
        }
    }
};

module.exports = [vodafonePrecioHandler, vodafonePrecioMovilHandler, vodafoneInteresHandler, VodafoneOrderIntentHandler]
*/



const terminales = require('../../terminales');
const callToOwner = require("../../utils/callToOwner");

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

const vodafoneInteresCompraHandler = {
    canHandle(handlerInput) {
        return (handlerInput.requestEnvelope.request.type === "IntentRequest" &&
            handlerInput.requestEnvelope.request.intent.name === "vodafoneTerminalesInit" &&
            handlerInput.requestEnvelope.request.intent.slots.interes &&
            (handlerInput.requestEnvelope.request.intent.slots.interes.value === "si" ||
                handlerInput.requestEnvelope.request.intent.slots.interes.value === "sí")
        );
    },
    async handle(handlerInput) {
        await callToOwner(handlerInput);

        return handlerInput.responseBuilder
            .speak("<speak>Estamos poniendote en contacto con un agente, atento a tu móvil... <audio src=\"https://hackathon-vf.s3-eu-west-1.amazonaws.com/jingle.mp3\"></audio></speak>")
            .withShouldEndSession(true)
            .getResponse();
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
    async handle(handlerInput) {
        const interes = handlerInput.requestEnvelope.request.intent.slots.interes.value;
        let precio = handlerInput.requestEnvelope.request.intent.slots.precio.value;

        const attributesManager = handlerInput.attributesManager;

        const sessionAttributes = attributesManager.getSessionAttributes()
        sessionAttributes.intentos = sessionAttributes.intentos ? sessionAttributes.intentos + 1 : 1
        if(interes == "si" || interes == "sí") {
            return handlerInput.responseBuilder
                .speak("¡Genial! En unos instantes un asesor de Vodafone se pondrá en contacto contigo. Pero mientras... ¡disfruta!")
                .reprompt("¡Genial! En unos instantes un asesor de Vodafone se pondrá en contacto contigo. Pero mientras... ¡disfruta!")
                .getResponse();
        } else {
            const query = terminales.getTerminalsByPrice(parseFloat(precio));
            if(query.length > sessionAttributes.intentos) {
                const terminal = query[sessionAttributes.intentos];
                const text = `He encontrado el terminal ${terminal.marca} ${terminal.modelo} 
                a un precio de ${terminal.cuotaMensualConIva} euros, con la tarifa ${terminal.nombreTarifa}, ¿te interesa?`;
                return handlerInput.responseBuilder
                    .speak(text)
                    .reprompt(text)
                    .addElicitSlotDirective("interes")
                    .getResponse();
            }
            else{
                await callToOwner(handlerInput);

                return handlerInput.responseBuilder
                        .speak("<speak>Estamos poniendote en contacto con un agente, atento a tu móvil... <audio src=\"https://hackathon-vf.s3-eu-west-1.amazonaws.com/jingle.mp3\"></audio></speak>")
                        .withShouldEndSession(true)
                        .getResponse();
            }
        }
    }
};

module.exports = [vodafonePrecioHandler, vodafonePrecioMovilHandler, vodafoneInteresHandler, vodafoneInteresCompraHandler]
