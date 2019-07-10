/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require("ask-sdk-core");

// Intro app
const LaunchRequestHandler = require("./handlers/LaunchRequestHandler");

// Terminales Handler
const vodafoneTerminalesInitHandler = require("./handlers/terminales/vodafoneTerminalesInitHandler");
const vodafonePrecioIntentHandler = require("./handlers/terminales/vodafonePrecioIntentHandler");
const vodafoneModeloIntentHandler = require("./handlers/terminales/vodafoneModeloIntentHandler");
// const vodafoneModeloContentHandler = require("./handlers/terminales/vodafoneModeloContentHandler");
// const vodafoneMarcaContentHandler = require("./handlers/terminales/vodafoneMarcaContentHandler");

// TV Handlers
const parrillaHandler = require("./handlers/parrillaHandler");

// Tarifas Moviles Handler
const vodafoneTarifasMovilesInitHandler = require("./handlers/tarifas moviles/VodafoneTarifasMovilesInitHandler");
const vodafonePermisosHandler = require("./handlers/tarifas moviles/VodafonePermissionsHandler");
const vodafoneJuegaOnlineIntentHandler = require("./handlers/tarifas moviles/VodafoneJuegaOnlineIntentHandler");
const vodafoneNoJuegaOnlineIntentHandler = require("./handlers/tarifas moviles/VodafoneNoJuegaOnlineIntentHandler");
const vodafoneUsoDatosIntentHandler = require("./handlers/tarifas moviles/VodafoneUsoDatosIntentHandler");
const vodafoneNoUsoDatosIntentHandler = require("./handlers/tarifas moviles/VodafoneNoUsoDatosIntentHandler");
const vodafoneLlamadasSeisMinutosIntentHandler = require("./handlers/tarifas moviles/VodafoneLlamadasSeisMinutosIntentHandler");
const vodafoneNoLlamadasSeisMinutosIntentHandler = require("./handlers/tarifas moviles/VodafoneNoLlamadasSeisMinutosIntentHandler");
const vodafoneTarifasMovilesOrderIntentHandler = require("./handlers/tarifas moviles/VodafoneTarifasMovilesOrderIntentHandler");

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
    parrillaHandler,
    ...vodafoneTerminalesInitHandler,
    vodafoneTarifasMovilesInitHandler,
    vodafonePermisosHandler,
    vodafoneTarifasMovilesInitHandler,
    vodafoneJuegaOnlineIntentHandler,
    vodafoneNoJuegaOnlineIntentHandler,
    vodafoneUsoDatosIntentHandler,
    vodafoneNoUsoDatosIntentHandler,
    vodafoneLlamadasSeisMinutosIntentHandler,
    vodafoneNoLlamadasSeisMinutosIntentHandler,
    vodafonePrecioIntentHandler,
    vodafoneModeloIntentHandler,
    vodafoneTarifasMovilesOrderIntentHandler, //Completed Order Tarifas Moviles
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
    DefaultOneHandler
  )
  .withApiClient(new Alexa.DefaultApiClient())
  .addErrorHandlers(ErrorHandler)
  .lambda();
