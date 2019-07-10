module.export = VodafoneTarifasMovilesOrderIntentHandler = {
  canHandle(handlerInput) {
    console.log("aquí está tu order")
    return (
        handlerInput.requestEnvelope.request.type === "IntentRequest" &&
        handlerInput.requestEnvelope.request.intent.name === "vodafoneTarifasMovilesInit" &&
        handlerInput.requestEnvelope.request.intent.slots.contratarTarifa.value === "si" &&
        handlerInput.requestEnvelope.request.intent.slots.contratarTarifa.value === "si"
    );
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
        .speak("<speak>Estamos poniendote en contacto con un agente, atento a tu móvil... <audio src=\"https://hackathon-vf.s3-eu-west-1.amazonaws.com/jingle.mp3\"></audio></speak>")
        .getResponse();
  }
};