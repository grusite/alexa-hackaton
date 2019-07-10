

const search = require('./tvBack');

const slots = {
  "tipo": {
    "name": "tipo",
    "value": "cine",
    "resolutions": {
      "resolutionsPerAuthority": [
        {
          "authority": "amzn1.er-authority.echo-sdk.amzn1.ask.skill.b904acd8-832e-4fb6-b64e-b95281ea5174.tipo",
          "status": {
            "code": "ER_SUCCESS_MATCH"
          },
          "values": [
            {
              "value": {
                "name": "películas",
                "id": "67e2f736c61ac518fe9ddbcb924882eb"
              }
            }
          ]
        }
      ]
    },
    "confirmationStatus": "NONE",
    "source": "USER"
  },
  "orden": {
    "name": "orden",
    "value": "echan",
    "resolutions": {
      "resolutionsPerAuthority": [
        {
          "authority": "amzn1.er-authority.echo-sdk.amzn1.ask.skill.b904acd8-832e-4fb6-b64e-b95281ea5174.orden",
          "status": {
            "code": "ER_SUCCESS_MATCH"
          },
          "values": [
            {
              "value": {
                "name": "echan",
                "id": "02dca241cf86e0ce90e405aced633296"
              }
            }
          ]
        }
      ]
    },
    "confirmationStatus": "NONE",
    "source": "USER"
  },
  "horario": {
    "name": "horario",
    "value": "22:00",
    "confirmationStatus": "NONE",
    "source": "USER"
  },
  "subgenre": {
    "name": "subgenre",
    "value": "drama",
    "resolutions": {
      "resolutionsPerAuthority": [
        {
          "authority": "amzn1.er-authority.echo-sdk.amzn1.ask.skill.b904acd8-832e-4fb6-b64e-b95281ea5174.subgenre",
          "status": {
            "code": "ER_SUCCESS_MATCH"
          },
          "values": [
            {
              "value": {
                "name": "suspense",
                "id": "3ffb737bae5f1eb69420ba226b1a2083"
              }
            }
          ]
        }
      ]
    },
    "confirmationStatus": "NONE",
    "source": "USER"
  },
  "tiempo": {
    "name": "tiempo",
    "value": "2019-07-10",
    "confirmationStatus": "NONE",
    "source": "USER"
  }
};

const result = search(slots).then( r => console.log(r))
