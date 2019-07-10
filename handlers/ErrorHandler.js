module.exports = ErrorHandler = {
	canHandle() {
		return true;
	},
	handle(handlerInput, error) {
		console.log(`Error handled: ${error.message}`);

		return handlerInput.responseBuilder
				.speak('Tengo respuesta para muchas cosas, pero no para eso.')
				.reprompt('Tengo respuesta para muchas cosas, pero no para eso.')
				.getResponse();
	},
};
