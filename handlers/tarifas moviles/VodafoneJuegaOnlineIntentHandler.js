module.export = VodafoneJuegaOnlineIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name ===
        "vodafoneTarifasMovilesInit" &&
      handlerInput.requestEnvelope.request.intent.slots.juegasOnline.value &&
      handlerInput.requestEnvelope.request.intent.slots.juegasOnline.value ===
        "si" &&
      handlerInput.requestEnvelope.request.intent.slots.usoDatos.value == null &&
      handlerInput.requestEnvelope.request.intent.slots.isLlamadasMasSeisMinutos.value == null
    );
  },
  handle(handlerInput) {

    console.log("Entro en JuegasOnline")

    const text = "Como buen Gamer, creo que la tarifa que más se adapta es la Ilimitada Movil Total porque lleva la fibra con un 1Gbps simétrico para todos tus dispositivos y datos ilimitados 5G para jugar con la Switch donde queráis"

    return handlerInput.responseBuilder
      .speak(text)
      .reprompt(text)
      //.addElicitSlotDirective("juegasOnline")
      .getResponse();
  }
};