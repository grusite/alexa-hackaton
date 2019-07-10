module.export = VodafoneNoJuegaOnlineIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name ===
        "vodafoneTarifasMovilesInit" &&
      handlerInput.requestEnvelope.request.intent.slots.juegasOnline.value &&
      handlerInput.requestEnvelope.request.intent.slots.juegasOnline.value ===
        "no"
    );
  },
  handle(handlerInput) {

    const text = "De media la gente suele pasar 3h al día en redes sociales. ¿Es tu caso o te fundes los datos?"

    return handlerInput.responseBuilder
      .speak(text)
      .reprompt(text)
      .addElicitSlotDirective("usoDatos")
      .getResponse();
  }
};