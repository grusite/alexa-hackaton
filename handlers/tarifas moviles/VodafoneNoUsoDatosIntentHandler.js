module.export = VodafoneNoUsoDatosIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name ===
        "vodafoneTarifasMovilesInit" &&
      handlerInput.requestEnvelope.request.intent.slots.usoDatos.value &&
      handlerInput.requestEnvelope.request.intent.slots.usoDatos.value ===
        "no"
    );
  },
  handle(handlerInput) {

    const text = "Perfecto. Y en cuanto a llamadas, ¿hablas más de 6 minutos al día?"

    return handlerInput.responseBuilder
      .speak(text)
      .reprompt(text)
      .addElicitSlotDirective("isLlamadasMasSeisMinutos")
      .getResponse();
  }
};