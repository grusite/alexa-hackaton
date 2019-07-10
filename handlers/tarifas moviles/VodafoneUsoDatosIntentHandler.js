module.export = VodafoneUsoDatosIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name ===
        "vodafoneTarifasMovilesInit" &&
      handlerInput.requestEnvelope.request.intent.slots.usoDatos.value &&
      handlerInput.requestEnvelope.request.intent.slots.usoDatos.value ===
        "si"
    );
  },
  handle(handlerInput) {

    const text = "Lo tengo, vas a disfrutar de manera ilimitada con la tarifa móvil Ilimitada Super"

    return handlerInput.responseBuilder
      .speak(text)
      .reprompt(text)
      .addElicitSlotDirective("usoDatos")
      .getResponse();
  }
};