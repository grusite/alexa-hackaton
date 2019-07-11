const callToOwner = require("../../utils/callToOwner");

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
      handlerInput.requestEnvelope.request.intent.slots.juegasOnline &&
      //handlerInput.requestEnvelope.request.intent.slots.juegasOnline.resolutions.resolutionsPerAuthority[0].values.value.id === "si" &&
      handlerInput.requestEnvelope.request.intent.slots.contratarTarifa.value == null &&
      handlerInput.requestEnvelope.request.intent.slots.juegasOnline.value === "sí" &&
      handlerInput.requestEnvelope.request.intent.slots.usoDatos.value == null &&
      handlerInput.requestEnvelope.request.intent.slots.isLlamadasMasSeisMinutos.value == null
    );
  },
  handle(handlerInput) {

    //console.log("Entro en JuegasOnline")

    const text = "<speak><prosody volume='loud'>Como buen <voice><lang xml:lang='en-US'>Gamer</lang></voice>" +
    "que eres,</prosody> creo que la tarifa que más se adapta a ti es la Ilimitada Móvil Total" +
    "<break time='0.1s' strength='weak'/> por <say-as interpret-as='cardinal'>54</say-as> euros con" +
    "<say-as interpret-as='cardinal'>99</say-as>al mes<break time='0.1s' strength='weak'/>" +
    "porque lleva fibra con un Giga simétrico y <break time='0.1s' strength='strong'/> ¡ojo!" +
    "datos ilimitados 5 G para jugar con la <voice><lang xml:lang='en-US'>Switch</lang></voice> donde quieras."+
    "<break time='0.1s' strength='weak'/> ¿Lo ponemos en marcha?</speak>"

    return handlerInput.responseBuilder
      .speak(text)
      .reprompt(text)
      .addElicitSlotDirective("contratarTarifa")
      .getResponse();
  }
};
const VodafoneTarifasMovilesOrderIntentHandler = {
  canHandle(handlerInput) {
    return (
        handlerInput.requestEnvelope.request.type === "IntentRequest" &&
        handlerInput.requestEnvelope.request.intent.name === "vodafoneTarifasMovilesInit" &&
        handlerInput.requestEnvelope.request.intent.slots.contratarTarifa.value === "sí"
    );
  },
  async handle(handlerInput){

    await callToOwner(handlerInput);

    return handlerInput.responseBuilder
        .speak("<speak>Estamos poniendote en contacto con un agente, atento a tu móvil... <audio src=\"https://hackathon-vf.s3-eu-west-1.amazonaws.com/jingle.mp3\"></audio></speak>")
        .addElicitSlotDirective("contratarTarifa")
        .withShouldEndSession(true)
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

    const text = "<speak>Vale,<break time='0.1s' strength='weak'/> vamos con otra cosa."+ 
    "De media la gente suele estar 3 horas al día en redes sociales,<break time='1s' strength='strong'/>"+ 
    "¿Navegas poco, o te fundes los datos?</speak>"

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
      handlerInput.requestEnvelope.request.intent.name === "vodafoneTarifasMovilesInit" &&
      handlerInput.requestEnvelope.request.intent.slots.usoDatos.value &&
      handlerInput.requestEnvelope.request.intent.slots.usoDatos.value === "sí" &&
      handlerInput.requestEnvelope.request.intent.slots.juegasOnline.value === "no" &&
      handlerInput.requestEnvelope.request.intent.slots.contratarTarifa.value == null &&
      handlerInput.requestEnvelope.request.intent.slots.isLlamadasMasSeisMinutos.value == null
    );
  },
  handle(handlerInput) {

    const text = "<speak><prosody volume='x-loud'>Lo tengo,</prosody><break time='0.1s' strength='weak'/>"+  
    "vas a disfrutar sin límites con la tarifa Ilimitada Móvil Super <break time='0.1s' strength='weak'/>" +
    "por <say-as interpret-as='cardinal'>41</say-as> euros con <say-as interpret-as='cardinal'>99</say-as>al"+
    "mes<break time='0.1s' strength='weak'/>que lleva fibra de <say-as interpret-as='cardinal'>600</say-as> megas"+
    "<emphasis level='strong'>y</emphasis>  <break time='0.1s' strength='strong'/> ¡ojo! datos ilimitados 5 G"+
    "para utilizar <voice><lang xml:lang='en-US'>Instagram,</lang></voice> <voice><lang xml:lang='en-US'>Facebook,"+
    "</lang></voice> y <voice><lang xml:lang='en-US'>Twitter</lang></voice> sin límites. ¿Quieres contratarla?</speak>"

    return handlerInput.responseBuilder
      .speak(text)
      .reprompt(text)
      .addElicitSlotDirective("contratarTarifa")
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

    const text = "<speak>Y en cuanto a llamadas, <break time='0.1s' strength='weak'/> ¿Hablas más de 6 minutos al día?"+
    "</speak>"

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
      handlerInput.requestEnvelope.request.intent.name === "vodafoneTarifasMovilesInit" &&
      handlerInput.requestEnvelope.request.intent.slots.isLlamadasMasSeisMinutos.value &&
      handlerInput.requestEnvelope.request.intent.slots.isLlamadasMasSeisMinutos.value === "sí" &&
      handlerInput.requestEnvelope.request.intent.slots.juegasOnline.value === "no" &&
      handlerInput.requestEnvelope.request.intent.slots.contratarTarifa.value == null &&
      handlerInput.requestEnvelope.request.intent.slots.usoDatos.value === "no"
    );
  },
  handle(handlerInput) {

    const text = "<speak><prosody volume='x-loud'>Lo tengo,</prosody><break time='0.1s' strength='weak'/>"+
    "con la tarifa Móvil Ilimitada por <say-as interpret-as='cardinal'>31</say-as> euros con"+
    "<say-as interpret-as='cardinal'>99</say-asaal mes<break time='0.1s' strength='weak'/>"+
    "no volverás a preocuparte de esos días en los hablas por los codos porque tienes llamadas y datos ilimitados."+
    "¿La contratamos?</speak>"

    return handlerInput.responseBuilder
      .speak(text)
      .reprompt(text)
      .addElicitSlotDirective("contratarTarifa")
      .getResponse();
  }
};

const VodafoneNoLlamadasSeisMinutosIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "vodafoneTarifasMovilesInit" &&
      handlerInput.requestEnvelope.request.intent.slots.isLlamadasMasSeisMinutos.value &&
      handlerInput.requestEnvelope.request.intent.slots.isLlamadasMasSeisMinutos.value === "no" &&
      handlerInput.requestEnvelope.request.intent.slots.juegasOnline.value === "no" &&
      handlerInput.requestEnvelope.request.intent.slots.contratarTarifa.value == null &&
      handlerInput.requestEnvelope.request.intent.slots.usoDatos.value === "no"
    );
  },
  handle(handlerInput) {

    const text = "<speak>Tengo la tarifa que mejor se adapta a ti. La Móvil Mini por <say-as interpret-as='cardinal'>47"+
    "</say-as> euros con <say-as interpret-as='cardinal'>99</say-as> al mes con doscientos minutos,"+
    "<break time='0.1s' strength='strong'/> 3 Gigas para navegar<emphasis level='strong'>y</emphasis>"+
    "<break time='0.1s' strength='strong'/> ¡ojo!<voice><lang xml:lang='en-US'>Chat Pass</lang></voice>"+
    "para chatear sin gastar datos de tu tarifa. ¿Quieres contratarla?</speak>"

    return handlerInput.responseBuilder
      .speak(text)
      .reprompt(text)
      .addElicitSlotDirective("contratarTarifa")
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
