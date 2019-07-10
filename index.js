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

// TV Handlers
const ParrillaHandler = require("./handlers/parrillaHandler");

// Tarifas Moviles Handler
const vodafoneTarifasMovilesInitHandler = require("./handlers/tarifas moviles/vodafoneTarifasMovilesInitHandler");
const vodafoneJuegaOnlineIntentHandler = require("./handlers/vodafoneJuegaOnlineIntentHandler");

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
    ParrillaHandler,
    vodafoneTerminalesInitHandler,
    vodafoneTarifasMovilesInitHandler,
    vodafoneJuegaOnlineIntentHandler,
    vodafoneMarcaIntentHandler,
    vodafonePrecioIntentHandler,
    vodafoneModeloIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
    DefaultOneHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
