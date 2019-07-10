const search = require('./tvBack');

const slots =   {
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
        "value": "drama",
        "resolutions": {
      "resolutionsPerAuthority": [
        {
          "authority": "amzn1.er-authority.echo-sdk.amzn1.ask.skill.622539e6-dd41-4503-a4fe-e53ef9db4f80.subgenre",
          "status": {
            "code": "ER_SUCCESS_MATCH"
          },
          "values": [
            {
              "value": {
                "name": "drama",
                "id": "cd672af2314970abf37b948f5b3af622"
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
}

const slotsAhora =  {
    "tipo": {
      "name": "tipo",
      "value": "series",
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
                  "name": "series",
                  "id": "bef99584217af744e404ed44a33af589"
                }
              }
            ]
          }
        ]
      },
      "confirmationStatus": "NONE",
      "source": "USER"
    }
}

const result = search(slotsAhora)

console.log(result)
