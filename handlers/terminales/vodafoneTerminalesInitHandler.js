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
      handlerInput.requestEnvelope.request.intent.slots.modelo.value &&
      handlerInput.requestEnvelope.request.intent.slots.interes.value == null
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
      .addElicitSlotDirective("interes")
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
      handlerInput.requestEnvelope.request.intent.slots.interes.value &&
      handlerInput.requestEnvelope.request.intent.slots.interes.value ===
        "si" &&
      handlerInput.requestEnvelope.request.intent.slots.segundoInteres.value ==
        null
    );
  },
  async handle(handlerInput) {
    await callToOwner(handlerInput);

    return handlerInput.responseBuilder
        .speak("<speak>Estamos poniendote en contacto con un agente, atento a tu móvil... <audio src=\"https://hackathon-vf.s3-eu-west-1.amazonaws.com/jingle.mp3\"></audio></speak>")
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
      handlerInput.requestEnvelope.request.intent.slots.interes.value &&
      handlerInput.requestEnvelope.request.intent.slots.interes.value ===
        "no" &&
      handlerInput.requestEnvelope.request.intent.slots.segundoInteres.value ==
        null
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
      .addElicitSlotDirective("segundoInteres")
      .getResponse();
  }
};

const vodafoneSegundoInteresSiIntentHandler = {
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
      handlerInput.requestEnvelope.request.intent.slots.segundoInteres.value &&
      handlerInput.requestEnvelope.request.intent.slots.segundoInteres.value ===
        "si"
    );
  },
  async handle(handlerInput) {
    await callToOwner(handlerInput);

    return handlerInput.responseBuilder
        .speak("<speak>Estamos poniendote en contacto con un agente, atento a tu móvil... <audio src=\"https://hackathon-vf.s3-eu-west-1.amazonaws.com/jingle.mp3\"></audio></speak>")
        .getResponse();
  }
};

const vodafoneSegundoInteresNoIntentHandler = {
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
      handlerInput.requestEnvelope.request.intent.slots.segundoInteres.value &&
      handlerInput.requestEnvelope.request.intent.slots.segundoInteres.value ===
        "no"
    );
  },
  async handle(handlerInput) {
    await callToOwner(handlerInput);

    return handlerInput.responseBuilder
        .speak("<speak>No pasa nada! Un asesor de Vodafone se pondrá en contacto contigo para encontrar el móvil más adecuado, atento a tu móvil... <audio src=\"https://hackathon-vf.s3-eu-west-1.amazonaws.com/jingle.mp3\"></audio></speak>")
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
  vodafoneSegundoInteresSiIntentHandler,
  vodafoneSegundoInteresNoIntentHandler
];
