module.export = VodafoneTarifasMovilesOrderIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "IntentRequest"
        && handlerInput.requestEnvelope.request.intent.name === "vodafoneTarifasMovilesInit"
        && handlerInput.requestEnvelope.request.dialogState === "COMPLETED";
  },
  handle(handlerInput){

   /* const drink = handlerInput.requestEnvelope.request.intent.slots.drink.value;
    let type; 

    if (drink === 'coffee') {
        type = handlerInput.requestEnvelope.request.intent.slots.coffeeRoast.value;
    } else if (drink === 'tea') {
        type = handlerInput.requestEnvelope.request.intent.slots.teaType.value;
    } else {
        type = 'water';
    }*/

    //const speechText = `It looks like you want ${type} ${drink}`;
    return handlerInput.responseBuilder
        .speak("Has llegado al final")
        .getResponse();
  }
};