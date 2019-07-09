/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require("ask-sdk-core");

// Intro app
const LaunchRequestHandler = require("./handlers/LaunchRequestHandler");

// Nuestros Handler
const VodadoneTestOneHandler = require("./handlers/VodafoneTestOnerHandler");
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
    VodadoneTestOneHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
    DefaultOneHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
