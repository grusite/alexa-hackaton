
const VodafoneTarifasMovilesInitHandler = {
	canHandle(handlerInput) {
		console.log('Entro en VodafoneTarifasMovilesInitHandler');
		return (handlerInput.requestEnvelope.request.type === 'IntentRequest'
				&& handlerInput.requestEnvelope.request.intent.name === 'vodafoneTarifasMovilesInit' &&
      			handlerInput.requestEnvelope.request.dialogState !== "COMPLETED");
	},
	handle(handlerInput) {
		//const speechText = 'Genial. Vamos a ver qué tarifa móvil se adapta mejor a ti. ¿Sueles jugar cada día online?';

		return handlerInput.responseBuilder
      			.addDelegateDirective()
      			.getResponse();	
	}
};

const VodafoneJuegaOnlineIntentHandler = {

  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "vodafoneTarifasMovilesInit" &&
      handlerInput.requestEnvelope.request.intent.slots.juegasOnline.value &&
      handlerInput.requestEnvelope.request.intent.slots.juegasOnline.value === "si" &&
      handlerInput.requestEnvelope.request.intent.slots.contratarTarifa.value == null &&
      handlerInput.requestEnvelope.request.intent.slots.usoDatos.value == null &&
      handlerInput.requestEnvelope.request.intent.slots.isLlamadasMasSeisMinutos.value == null
    );
  },
  handle(handlerInput) {

    //console.log("Entro en JuegasOnline")

    const text = "Como buen Gamer, creo que la tarifa que más se adapta es la Ilimitada Movil Total porque lleva la fibra con un 1Gbps simétrico para todos tus dispositivos y datos ilimitados 5G para jugar con la Switch donde queráis";

    return handlerInput.responseBuilder
      .speak(text)
      .reprompt(text)
      .addElicitSlotDirective("contratarTarifa")
      .getResponse();
  }
};
const VodafoneTarifasMovilesOrderIntentHandler = {
  canHandle(handlerInput) {
    console.log("aquí está tu order")
    return (
        handlerInput.requestEnvelope.request.type === "IntentRequest" &&
        handlerInput.requestEnvelope.request.intent.name === "vodafoneTarifasMovilesInit" &&
        handlerInput.requestEnvelope.request.intent.slots.juegasOnline.value === "si" &&
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
        .addElicitSlotDirective("contratarTarifa")
        .getResponse();
  }
};
const VodafoneNoJuegaOnlineIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name ===
        "vodafoneTarifasMovilesInit" &&
      handlerInput.requestEnvelope.request.intent.slots.juegasOnline.value &&
      handlerInput.requestEnvelope.request.intent.slots.juegasOnline.value ===
        "no" && 
      handlerInput.requestEnvelope.request.intent.slots.usoDatos.value == null &&
      handlerInput.requestEnvelope.request.intent.slots.isLlamadasMasSeisMinutos.value == null
    );
  },
  handle(handlerInput) {

    const text = "De media la gente suele pasar 3h al día en redes sociales. ¿Es tu caso o te fundes los datos?";

    return handlerInput.responseBuilder
      .speak(text)
      .reprompt(text)
      .addElicitSlotDirective("usoDatos")
      .getResponse();
  }
};

const VodafoneUsoDatosIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name ===
        "vodafoneTarifasMovilesInit" &&
      handlerInput.requestEnvelope.request.intent.slots.usoDatos.value &&
      handlerInput.requestEnvelope.request.intent.slots.usoDatos.value ===
        "si" &&
      handlerInput.requestEnvelope.request.intent.slots.juegasOnline.value == "no" &&
      handlerInput.requestEnvelope.request.intent.slots.isLlamadasMasSeisMinutos.value == null
    );
  },
  handle(handlerInput) {

    const text = "Lo tengo, vas a disfrutar de manera ilimitada con la tarifa móvil Ilimitada Super";

    return handlerInput.responseBuilder
      .speak(text)
      .reprompt(text)
      .addElicitSlotDirective("usoDatos")
      .getResponse();
  }
};

const VodafoneNoUsoDatosIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name ===
        "vodafoneTarifasMovilesInit" &&
      handlerInput.requestEnvelope.request.intent.slots.usoDatos.value &&
      handlerInput.requestEnvelope.request.intent.slots.usoDatos.value ===
        "no" &&
      handlerInput.requestEnvelope.request.intent.slots.juegasOnline.value == "no" &&
      handlerInput.requestEnvelope.request.intent.slots.isLlamadasMasSeisMinutos.value == null
    );
  },
  handle(handlerInput) {

    const text = "Perfecto. Y en cuanto a llamadas, ¿hablas más de 6 minutos al día?";

    return handlerInput.responseBuilder
      .speak(text)
      .reprompt(text)
      .addElicitSlotDirective("isLlamadasMasSeisMinutos")
      .getResponse();
  }
};

const VodafoneLlamadasSeisMinutosIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name ===
        "vodafoneTarifasMovilesInit" &&
      handlerInput.requestEnvelope.request.intent.slots.isLlamadasMasSeisMinutos.value &&
      handlerInput.requestEnvelope.request.intent.slots.isLlamadasMasSeisMinutos.value ===
        "si" &&
      handlerInput.requestEnvelope.request.intent.slots.juegasOnline.value == "no" &&
      handlerInput.requestEnvelope.request.intent.slots.usoDatos.value == "no"
    );
  },
  handle(handlerInput) {

    const text = "Tenemos la tarifa que mejor se adapta a ti. La tarifa Movil Ilimitada";

    return handlerInput.responseBuilder
      .speak(text)
      .reprompt(text)
      .addElicitSlotDirective("isLlamadasMasSeisMinutos")
      .getResponse();
  }
};

const VodafoneNoLlamadasSeisMinutosIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name ===
        "vodafoneTarifasMovilesInit" &&
      handlerInput.requestEnvelope.request.intent.slots.isLlamadasMasSeisMinutos.value &&
      handlerInput.requestEnvelope.request.intent.slots.isLlamadasMasSeisMinutos.value ===
        "no" &&
      handlerInput.requestEnvelope.request.intent.slots.juegasOnline.value == "no" &&
      handlerInput.requestEnvelope.request.intent.slots.usoDatos.value == "no"
    );
  },
  handle(handlerInput) {

    const text = "Tenemos la tarifa que mejor se adapta a ti. La tarifa móvil Mini con 200 minutos de llamadas al mes y 3GB de datos para navegar y Chat Pass para usar apps de mensajería sin gastar datos de tu tarifa";

    return handlerInput.responseBuilder
      .speak(text)
      .reprompt(text)
      .addElicitSlotDirective("isLlamadasMasSeisMinutos")
      .getResponse();
  }
};

module.exports = [
  VodafoneTarifasMovilesInitHandler,
  VodafoneJuegaOnlineIntentHandler,
  VodafoneNoJuegaOnlineIntentHandler,
  VodafoneUsoDatosIntentHandler,
  VodafoneNoUsoDatosIntentHandler,
  VodafoneLlamadasSeisMinutosIntentHandler,
  VodafoneNoLlamadasSeisMinutosIntentHandler,
  VodafoneTarifasMovilesOrderIntentHandler
];
