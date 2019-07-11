const terminales = require("../../terminales");
const callToOwner = require("../../utils/callToOwner");

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
    const text = "<speak>\n" +
            "¿Tienes alguna marca en mente?\n" +
            "Lo que más me piden es <lang xml:lang=\"en-US\">Apple</lang> o Samsung <break time=\"0.75s\"/> pero tú decides.\n" +
            "</speak>"
    return handlerInput.responseBuilder
      .speak(text)
      .reprompt(text)
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
    const text = "<speak>\n" +
            "<emphasis level=\"strong\">Genial</emphasis> <break time=\"0.5s\"/> ¿Qué modelo quieres?\n" +
            "</speak>";
    return handlerInput.responseBuilder
      .speak(text)
      .reprompt(text)
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
    const text = `<speak>
            <emphasis level="strong">Vale</emphasis> <break time="0.5s"/>He encontrado el terminal ${terminal.marca} ${terminal.modelo}
       a un precio de <lang xml:lang=\"en-US\">${terminal.cuotaMensualConIva}</lang> euros
       con la tarifa ${terminal.nombreTarifa}.
       ¿Te interesa?</speak>`;
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
        .speak("<speak>\n" +
                "Genial!\n" +
                "En unos instantes un asesor de Vodafone se pondrá en contacto contigo.\n" +
                "Mientas tanto, ¡disfruta!\n" +
                "<audio src=\"https://hackathon-vf.s3-eu-west-1.amazonaws.com/jingle.mp3\"></audio></speak>")
        .withShouldEndSession(true)
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

    const text = `<speak><emphasis level="strong">¡Vale!</emphasis>¿Te interesa entonces el  ${terminal.marca} ${terminal.modelo}
    a un precio de ${terminal.cuotaMensualConIva} euros
    con la tarifa ${terminal.nombreTarifa}?</speak>`;

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
