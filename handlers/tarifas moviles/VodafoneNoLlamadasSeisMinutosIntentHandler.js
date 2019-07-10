module.export = VodafoneNoLlamadasSeisMinutosIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name ===
        "vodafoneTarifasMovilesInit" &&
      handlerInput.requestEnvelope.request.intent.slots.isLlamadasMasSeisMinutos.value &&
      handlerInput.requestEnvelope.request.intent.slots.isLlamadasMasSeisMinutos.value ===
        "no"
    );
  },
  handle(handlerInput) {

    const text = "Tenemos la tarifa que mejor se adapta a ti. La tarifa móvil Mini con 200 minutos de llamadas al mes y 3GB de datos para navegar y Chat Pass para usar apps de mensajería sin gastar datos de tu tarifa"

    return handlerInput.responseBuilder
      .speak(text)
      .reprompt(text)
      .addElicitSlotDirective("isLlamadasMasSeisMinutos")
      .getResponse();
  }
};