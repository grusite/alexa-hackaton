const PERMISSIONS = [
    'alexa::profile:given_name:read', // Permisos para pedirle acceso al nombre
    'alexa::profile:email:read', // Permisos para pedirle acceso al email
    'alexa::profile:mobile_number:read', // Permisos para pedirle acceso al numero de móvil
    'alexa::alerts:reminders:skill:readwrite' // permisos para los reminders
];
const axios = require("axios");

module.exports = vodafonePermisosHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'vodafonePermissions';
    },
    async handle(handlerInput) {
        console.log("vodafonePermisosHandler");
        //let accessToken = this.event.context.System.apiAccessToken;
        const speechText = 'Bienvenido a Vodafone Skill';
        const { requestEnvelope, serviceClientFactory, responseBuilder } = handlerInput;

        /*const consentToken = requestEnvelope.context.System.user.permissions
            && requestEnvelope.context.System.user.permissions.consentToken;*/
        /*if (!consentToken) {
            return responseBuilder
                .speak('Nos das permiso a tu nombre?')
                .withAskForPermissionsConsentCard(PERMISSIONS)
                .getResponse();
        }*/
        try {
            const { deviceId } = requestEnvelope.context.System.device;
            const UpsServiceClient = serviceClientFactory.getUpsServiceClient();
            const name = await UpsServiceClient.getProfileGivenName();
            const email = await UpsServiceClient.getProfileEmail();
            const mobile = await UpsServiceClient.getProfileMobileNumber();
            const ReminderManagementServiceClient = serviceClientFactory.getReminderManagementServiceClient();
            const reminderPayload = {
                "trigger": {
                    "type": 'SCHEDULED_RELATIVE',
                    "offsetInSeconds": '300',
                    "timeZoneId": 'Europe/Madrid'
                },
                "alertInfo": {
                    "spokenInfo": {
                        "content": [{
                            "locale": 'es-ES',
                            "text": 'fuc iu',
                        }]
                    }
                },
                "pushNotification": {
                    "status": "ENABLED"
                }
            };

            await ReminderManagementServiceClient.createReminder(reminderPayload);
            console.log("Te he creado un recordatorio");
            return responseBuilder.speak('<speak>Te acabo de crear un recordatorio</speak>').getResponse();
/*
            let nro = '610513459';
            console.log("Iniciamos llamada al "+nro);
            //console.log("Iniciamos llamada al "+mobile.phoneNumber);
            const url = 'https://ws.walmeric.com/provision/wsclient/client_addlead.html?c_var_2=vodafone-one&phone='+nro+'&verifyLeadId=NO&boton-flotante=Si&url=&check=on&url=https%3A%2F%2Fwww.vodafone.es%2Fc%2Ftienda-online%2Fparticulares%2Ftarifas-moviles%2Ftarifa-movil-1%2F&URL_sin_parametro=https%3A%2F%2Fwww.vodafone.es%2Fc%2Ftienda-online%2Fparticulares%2Ftarifas-moviles%2Ftarifa-movil-1%2F&idTag=29842f94d414949bf95fb2e6109142cfef1fb2a78114c2c536a36bf5a65b953a5fc1ca581ceb7bf8fd143a36f4eb693794c0f95c76664a12dbaa532a82b5988a207dd2d28aa08a82723b60cd54ef0e48b3a24e4b4ad1c4968e7803e10bb5ed21b0441305a1103889a0fa0536abc02d8c&format=json';
            //const url = 'https://ws.walmeric.com/provision/wsclient/client_addlead.html?c_var_2=vodafone-one&phone='+mobile.phoneNumber+'&verifyLeadId=NO&boton-flotante=Si&url=&check=on&url=https%3A%2F%2Fwww.vodafone.es%2Fc%2Ftienda-online%2Fparticulares%2Ftarifas-moviles%2Ftarifa-movil-1%2F&URL_sin_parametro=https%3A%2F%2Fwww.vodafone.es%2Fc%2Ftienda-online%2Fparticulares%2Ftarifas-moviles%2Ftarifa-movil-1%2F&idTag=29842f94d414949bf95fb2e6109142cfef1fb2a78114c2c536a36bf5a65b953a5fc1ca581ceb7bf8fd143a36f4eb693794c0f95c76664a12dbaa532a82b5988a207dd2d28aa08a82723b60cd54ef0e48b3a24e4b4ad1c4968e7803e10bb5ed21b0441305a1103889a0fa0536abc02d8c&format=json';

            const response = await axios.get(url);
            console.log("Ya hemos iniciado la llamada response: ",response);
            const data = response.data;
            console.log("Ya hemos iniciado la llamada data: ",data);
            //const json = await response.json();
            //console.log("Ya hemos iniciado la llamada json: ",json);
            //return responseBuilder.speak('<speak>Te estamos llamando al <say-as interpret-as="digits">'+mobile.phoneNumber+'</say-as></speak>').getResponse();
            return responseBuilder.speak('<speak>Te estamos llamando al <say-as interpret-as="digits">'+nro+'</say-as></speak>').getResponse();

            */
        } catch (error) {
            if (error.name !== 'ServiceError') {
                const response = responseBuilder.speak("hay un error"+error).getResponse();
                return response;
            }else{
                console.log("error", error);
                return responseBuilder.speak("hay un error generico").getResponse();
            }
            //throw error;
        }
    },
};
