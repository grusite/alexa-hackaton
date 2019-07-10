/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require("ask-sdk-core");

// Intro app
const LaunchRequestHandler = require("./handlers/LaunchRequestHandler");

// Terminales Handler
const vodafoneTerminalesInitHandler = require("./handlers/terminales/vodafoneTerminalesInitHandler");
const vodafoneMarcaIntentHandler = require("./handlers/terminales/vodafoneMarcaIntentHandler");
const vodafonePrecioIntentHandler = require("./handlers/terminales/vodafonePrecioIntentHandler");
const vodafoneModeloIntentHandler = require("./handlers/terminales/vodafoneModeloIntentHandler");
const vodafoneModeloContentHandler = require("./handlers/terminales/vodafoneModeloContentHandler");

// TV Handlers
const parrillaHandler = require("./handlers/parrillaHandler");

// Tarifas Moviles Handler
const vodafoneTarifasMovilesInitHandler = require("./handlers/tarifas moviles/VodafoneTarifasMovilesInitHandler");
const vodafonePermisosHandler = require("./handlers/tarifas moviles/VodafonePermissionsHandler");
const vodafoneJuegaOnlineIntentHandler = require("./handlers/tarifas moviles/VodafoneJuegaOnlineIntentHandler");

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
    vodafoneTerminalesInitHandler,
    vodafoneTarifasMovilesInitHandler,
    vodafonePermisosHandler,
    vodafoneJuegaOnlineIntentHandler,
    vodafoneMarcaIntentHandler,
    vodafonePrecioIntentHandler,
    vodafoneModeloIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
    DefaultOneHandler
  ).withApiClient(new Alexa.DefaultApiClient())
  .addErrorHandlers(ErrorHandler)
  .lambda();
