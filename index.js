/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require("ask-sdk-core");

// Intro app
const LaunchRequestHandler = require("./handlers/LaunchRequestHandler");

// Terminales Handler
const vodafoneTerminalesInitHandler = require("./handlers/terminales/vodafoneTerminalesInitHandler");
const vodafonePrecioHandler = require("./handlers/terminales/vodafonePrecioHandler");

// TV Handlers
const parrillaInitHandler = require("./handlers/tv/parrillaInitHandler");
const parrillaTipoContentHandler = require("./handlers/tv/parrillaTipoContentHandler");
const parrillaMasContentHandler = require("./handlers/tv/parrillaMasContentHandler");

// Tarifas Moviles Handler
const vodafoneTarifasMovilesInitHandler = require("./handlers/tarifas moviles/VodafoneTarifasMovilesInitHandler");
const vodafonePermisosHandler = require("./handlers/tarifas moviles/VodafonePermissionsHandler");
//const vodafoneJuegaOnlineIntentHandler = require("./handlers/tarifas moviles/VodafoneJuegaOnlineIntentHandler");
//const vodafoneNoJuegaOnlineIntentHandler = require("./handlers/tarifas moviles/VodafoneNoJuegaOnlineIntentHandler");
//const vodafoneUsoDatosIntentHandler = require("./handlers/tarifas moviles/VodafoneUsoDatosIntentHandler");
//const vodafoneNoUsoDatosIntentHandler = require("./handlers/tarifas moviles/VodafoneNoUsoDatosIntentHandler");
//const vodafoneLlamadasSeisMinutosIntentHandler = require("./handlers/tarifas moviles/VodafoneLlamadasSeisMinutosIntentHandler");
//const vodafoneNoLlamadasSeisMinutosIntentHandler = require("./handlers/tarifas moviles/VodafoneNoLlamadasSeisMinutosIntentHandler");
//const vodafoneTarifasMovilesOrderIntentHandler = require("./handlers/tarifas moviles/VodafoneTarifasMovilesOrderIntentHandler");

// Default one
const DefaultOneHandler = require("./handlers/DefaultOneHandler");

// Built-in core
const HelpIntentHandler = require("./handlers/HelpIntentHandler");
const CancelAndStopIntentHandler = require("./handlers/CancelAndStopIntentHandler");
const SessionEndedRequestHandler = require("./handlers/SessionEndedRequestHandler");
const ErrorHandler = require("./handlers/ErrorHandler");

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    parrillaInitHandler,
    parrillaTipoContentHandler,
    ...parrillaMasContentHandler,
    vodafonePermisosHandler,
    ...vodafoneTerminalesInitHandler,
    ...vodafonePrecioHandler,
    ...vodafoneTarifasMovilesInitHandler,
    //  vodafoneJuegaOnlineIntentHandler,
    //  vodafoneNoJuegaOnlineIntentHandler,
    //  vodafoneUsoDatosIntentHandler,
    //  vodafoneNoUsoDatosIntentHandler,
    //  vodafoneLlamadasSeisMinutosIntentHandler,
    //  vodafoneNoLlamadasSeisMinutosIntentHandler,
    //vodafoneTarifasMovilesOrderIntentHandler, //Completed Order Tarifas Moviles
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
    DefaultOneHandler
  )
  .withApiClient(new Alexa.DefaultApiClient())
  .addErrorHandlers(ErrorHandler)
  .lambda();
