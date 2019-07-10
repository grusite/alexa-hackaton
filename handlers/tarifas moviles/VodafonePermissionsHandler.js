const PERMISSIONS = [
    'alexa::profile:given_name:read', // Permisos para pedirle acceso al nombre
    'alexa::profile:email:read', // Permisos para pedirle acceso al email
    'alexa::profile:mobile_number:read' // Permisos para pedirle acceso al numero de móvil
];

module.exports = LaunchRequestHandler = {
    canHandle(handlerInput) {
        const { request } = handlerInput.requestEnvelope;
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'vodafonePermissions';
    },
    async handle(handlerInput) {
        //let accessToken = this.event.context.System.apiAccessToken;
        const speechText = 'Bienvenido a Vodafone Skill';
        const { requestEnvelope, serviceClientFactory, responseBuilder } = handlerInput;

        const consentToken = requestEnvelope.context.System.user.permissions
            && requestEnvelope.context.System.user.permissions.consentToken;
        if (!consentToken) {
            return responseBuilder
                .speak('Nos das permiso a tu nombre?')
                .withAskForPermissionsConsentCard(PERMISSIONS)
                .getResponse();
        }
        try {
            const { deviceId } = requestEnvelope.context.System.device;
            const UpsServiceClient = serviceClientFactory.getUpsServiceClient();
            const name = await UpsServiceClient.getProfileGivenName();
            const email = await UpsServiceClient.getProfileEmail();
            const mobile = await UpsServiceClient.getProfileMobileNumber();


            console.log('Ya tenemos sus datos');
            console.log('name', name);
            //console.log('email',email);
            //console.log('mobile',mobile);
            return responseBuilder.speak('tu nombre es '+name+'. Tu email es: '+email+'. Y tu móvil es: '+mobile[0]).getResponse();
        } catch (error) {
            if (error.name !== 'ServiceError') {
                const response = responseBuilder.speak("hay un error"+error).getResponse();
                return response;
            }
            throw error;
        }
    },
};
