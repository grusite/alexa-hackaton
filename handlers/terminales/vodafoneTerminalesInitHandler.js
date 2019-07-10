const terminales = require("../../terminales");

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
        "marca" &&
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
      handlerInput.requestEnvelope.request.intent.name ===
        "vodafoneTerminalesInit" &&
      handlerInput.requestEnvelope.request.intent.slots.precioMarca.value &&
      handlerInput.requestEnvelope.request.intent.slots.precioMarca.value ===
        "marca" &&
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
const vodafoneModeloIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name ===
        "vodafoneTerminalesInit" &&
      handlerInput.requestEnvelope.request.intent.slots.precioMarca.value &&
      handlerInput.requestEnvelope.request.intent.slots.precioMarca.value ===
        "marca" &&
      handlerInput.requestEnvelope.request.intent.slots.marca.value &&
      handlerInput.requestEnvelope.request.intent.slots.modelo.value
    );
  },
  handle(handlerInput) {
    let marca = handlerInput.requestEnvelope.request.intent.slots.marca.value;
    let modelo = handlerInput.requestEnvelope.request.intent.slots.modelo.value;
    const query = terminales.getTerminals(marca, modelo);
    const terminal = query[0];
    const text = `He encontrado el terminal ${terminal.marca} ${terminal.modelo}
       a un precio de ${terminal.cuotaMensualConIva} euros
       con la tarifa ${terminal.nombreTarifa}.
       ¿Te interesa?`;
    return handlerInput.responseBuilder
      .speak(text)
      .reprompt(text)
      .addElicitSlotDirective("modelo")
      .getResponse();
  }
};

const vodafoneInteresSiIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name ===
        "vodafoneTerminalesInit" &&
      handlerInput.requestEnvelope.request.intent.slots.precioMarca.value &&
      handlerInput.requestEnvelope.request.intent.slots.precioMarca.value ===
        "marca" &&
      handlerInput.requestEnvelope.request.intent.slots.marca.value &&
      handlerInput.requestEnvelope.request.intent.slots.modelo.value &&
      handlerInput.requestEnvelope.request.intent.slots.interes.value === "si"
    );
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(
        "Genial! Un asesor de Vodafone se pondrá en contacto contigo en unos instantes"
      )
      .getResponse();
  }
};

const vodafoneInteresNoIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name ===
        "vodafoneTerminalesInit" &&
      handlerInput.requestEnvelope.request.intent.slots.precioMarca.value &&
      handlerInput.requestEnvelope.request.intent.slots.precioMarca.value ===
        "marca" &&
      handlerInput.requestEnvelope.request.intent.slots.marca.value &&
      handlerInput.requestEnvelope.request.intent.slots.modelo.value &&
      handlerInput.requestEnvelope.request.intent.slots.interes.value === "no"
    );
  },
  handle(handlerInput) {
    let marca = handlerInput.requestEnvelope.request.intent.slots.marca.value;
    let modelo = handlerInput.requestEnvelope.request.intent.slots.modelo.value;
    const query = terminales.getTerminals(marca, modelo);
    const terminal = query[1];
    const text = `Vale! Te interesa entonces el  ${terminal.marca} ${
      terminal.modelo
    }
    a un precio de ${terminal.cuotaMensualConIva} euros
    con la tarifa ${terminal.nombreTarifa}?`;
    return handlerInput.responseBuilder
      .speak(text)
      .reprompt(text)
      .getResponse();
  }
};

const vodafonesegundoInteresSiIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name ===
        "vodafoneTerminalesInit" &&
      handlerInput.requestEnvelope.request.intent.slots.precioMarca.value &&
      handlerInput.requestEnvelope.request.intent.slots.precioMarca.value ===
        "marca" &&
      handlerInput.requestEnvelope.request.intent.slots.marca.value &&
      handlerInput.requestEnvelope.request.intent.slots.modelo.value &&
      handlerInput.requestEnvelope.request.intent.slots.interes.value ===
        "no" &&
      handlerInput.requestEnvelope.request.intent.slots.segundoInteres.value ===
        "si"
    );
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(
        "Genial! Un asesor de Vodafone se pondrá en contacto contigo en unos instantes"
      )
      .getResponse();
  }
};

const vodafonesegundoInteresSiIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name ===
        "vodafoneTerminalesInit" &&
      handlerInput.requestEnvelope.request.intent.slots.precioMarca.value &&
      handlerInput.requestEnvelope.request.intent.slots.precioMarca.value ===
        "marca" &&
      handlerInput.requestEnvelope.request.intent.slots.marca.value &&
      handlerInput.requestEnvelope.request.intent.slots.modelo.value &&
      handlerInput.requestEnvelope.request.intent.slots.interes.value ===
        "no" &&
      handlerInput.requestEnvelope.request.intent.slots.segundoInteres.value ===
        "si"
    );
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(
        "No pasa nada! Un asesor de Vodafone se pondrá en contacto contigo para encontrar el móvil más adecuado"
      )
      .getResponse();
  }
};

module.exports = [
  vodafoneTerminalesInitHandler,
  vodafoneMarcaIntentHandler,
  vodafoneMarcaContentHandler,
  vodafoneModeloIntentHandler,
  vodafoneInteresSiIntentHandler,
  vodafoneInteresNoIntentHandler,
  vodafonesegundoInteresSiIntentHandler,
  vodafonesegundoInteresNoIntentHandler
];
