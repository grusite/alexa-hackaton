

const search = require('./tvBack');

const slots =  {
  "tipo": {
    "name": "tipo",
        "value": "cine",
        "resolutions": {
      "resolutionsPerAuthority": [
        {
          "authority": "amzn1.er-authority.echo-sdk.amzn1.ask.skill.622539e6-dd41-4503-a4fe-e53ef9db4f80.tipo",
          "status": {
            "code": "ER_SUCCESS_MATCH"
          },
          "values": [
            {
              "value": {
                "name": "cine",
                "id": "23a1c740ff145d7962d469ec2153bf06"
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
          "authority": "amzn1.er-authority.echo-sdk.amzn1.ask.skill.622539e6-dd41-4503-a4fe-e53ef9db4f80.orden",
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
        "confirmationStatus": "NONE"
  },
  "tiempo": {
    "name": "tiempo",
        "value": "2019-07-10",
        "confirmationStatus": "NONE",
        "source": "USER"
  }
};

const result = search(slots)

console.log(result)
