const fs = require('fs');
const path = require('path');
const R = require('ramda');
const axios = require("axios");

// que {echan} {tiempo} a la {horario} de {genero}

/** ======================= CARGA DE DATOS ====================================================>**/
// TODO: URL (https://hackaton-vf.s3-eu-west-1.amazonaws.com/20190709.json)
const fileDir = path.join(__dirname);
// TODO: SELECCIONAMOS FICHERO
// const file = '/20190709-mini.json';
// const file = '/20190709.json';

// FILE SYSTEM
// -----------
/*
const systemFile = () =>  fs.readFile(fileDir + file, 'utf8', function(err, contents) {
  if (!err) {
    // TODO
    main(JSON.parse(contents));
  } else {
    console.log('ERRROR');
  }
});
*/


// AXIOS
// -----
const url = "https://hackaton-vf.s3-eu-west-1.amazonaws.com/";
// const jsonFile = '20190709.json';




/** ======================= IMPUT DATA (from ALEXA) ===========================================>**/

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








/** <---------------- FIN: IMPUT DATA (from ALEXA) ---------------------------------------------**/

const filterBy = typeOfFiltering => key => value => data => {
  const isValueAnArray = typeof value === 'object';
  const isFilterBy = comp => key => isValueAnArray && R.equals(comp)(key);
  return R.cond([
    [isFilterBy('range'), () => data[key] >= value[0] && data[key] <= value[1]],
    [R.equals('lte'), () => parseInt(data[key]) + parseInt(data['schedule_duration']) <= parseInt(value)],
    [R.equals('gender'), () => data[key].toLowerCase().indexOf(value) === 0],
    [R.equals('subGender'), () => data[key].toLowerCase().indexOf(value) > -1],
    [R.T, () => data[key] == value],
  ])(typeOfFiltering);
};

/** ======================= FLATEN INITIAL JSON DATA =========================================>**/
const addCanalAndFlatten = pair => {
  const [key, value] = pair;
  return value.map(item => {
    const {program, ...rest} = item;
    return {...program, ...rest, canal: key};
  });
};
const objectFlatten = data =>
    Object.entries(data).reduce(
        (acc, pair) => [...acc, ...addCanalAndFlatten(pair)],
        [],
    );

/** ======================= MAIN  ============================================================>**/
const formatTime = t => t.replace(/:/g,'');
const toLowerCase = s => s.toLowerCase();
const formatDate = d => d.replace(/-/g,'');
const toUrlFile = name => name+'.json';
const today = () => {
  let todayD = new Date();
  return todayD.getFullYear()+(todayD.getMonth()+1)+todayD.getDate();
}
const dateFile = d => toUrlFile(formatDate(d));
const orderBy = field => data => R.reverse(R.sortBy(R.prop(field))(data));
const genderType = gender => data => R.filter(filterBy('gender')('genres')(gender))(data);
const subGenderType = subGender => data => R.filter(filterBy('subGender')('genres')(subGender))(data);
const endsBefore = hour => data => R.filter(filterBy('lte')('schedule_air_time')(hour))(data);
const startAt = hour => data => R.filter(filterBy('range')('schedule_air_time')(hour))(data);
const rangeGap = hour => [parseInt(hour)-10, parseInt(hour)+10 ]


search = async slot => {
  const dateView = formatDate(slot.tiempo.value) || today();  //--> esto se ussarápara hacer la llamada al json
  const timeView = formatTime(slot.horario.value) || '2100';
  const rangeView = ['0200', '0455'];
  const endView = '2359';
  const gender = slot.tipo.value;
  const subGender = slot.subgenre.value ;
  const orderField = 'year';
  const jsonFile = dateFile(dateView);
  const getData = async url => {
    try {
      const response = await axios.get(url);
      return main(response.data);
    } catch (error) {
      return 'Erroraco del dragón';
      console.log(error);
    }
  };

  const main = data => {
    const result = R.pipe(
        objectFlatten,
        startAt(rangeGap(timeView)),    // comienzo de hora exacta
        // startAt(rangeView), // rango de horas
        // endsBefore(endView), // termina antes de la hora indicada
        genderType(toLowerCase(gender)), // hace una búsqueda con like
        subGenderType(subGender),
        // orderBy(orderField)
    )(data);
    return result;
    // console.log(result)
  };

  return getData(url+jsonFile);

};


module.exports = search;

