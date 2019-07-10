const fs = require('fs');
const path = require('path');
const R = require('ramda');

const fakeData = require('../data/20190709.json');
const tvShows = require('../data/sta.json');

/** ======================= CARGA DE DATOS ====================================================>**/
// TODO: URL (https://hackaton-vf.s3-eu-west-1.amazonaws.com/20190709.json)

// AXIOS
// -----
const url = 'https://hackaton-vf.s3-eu-west-1.amazonaws.com/';
/** ======================= IMPUT DATA (from ALEXA) ===========================================>**/

/** <---------------- FIN: IMPUT DATA (from ALEXA) ---------------------------------------------**/

const filterBy = typeOfFiltering => key => value => data => {
  const isValueAnArray = typeof value === 'object';
  const isFilterBy = comp => key => isValueAnArray && R.equals(comp)(key);
  return R.cond([
    [isFilterBy('range'), () => data[key] >= value[0] && data[key] <= value[1]],
    [R.equals('lte'), () => parseInt(data[key]) + parseInt(data['schedule_duration']) <= parseInt(value)],
    [R.equals('gender'), () => data[key].toLowerCase().indexOf(value) === 0],
    [R.equals('subGender'), () => data[key].toLowerCase().indexOf(value) > -1],
    [R.equals('live'), () => (data[key] <= value) && (parseInt(data[key]) + parseInt(data['schedule_duration']) > value)],
    [R.T, () => data[key] == value],
  ])(typeOfFiltering);
};

/** ======================= FLATEN INITIAL JSON DATA =========================================>**/


const name = ref => id => ref[id].name;
const canalName = name(tvShows);

const addCanalAndFlatten = pair => {
  const [key, value] = pair;
  return value.map(item => {
    const {program, ...rest} = item;
    return {...program, ...rest, canal: canalName(key)};
  });
};
const objectFlatten = data =>
    Object.entries(data).reduce(
        (acc, pair) => [...acc, ...addCanalAndFlatten(pair)],
        [],
    );

/** ======================= MAIN  ============================================================>**/
const formatTime = t => t.replace(/:/g, '');
const toLowerCase = s => s.toLowerCase();
const formatDate = d => d.replace(/-/g, '');
const toUrlFile = name => name + '.json';
const zeroFill = n => n < 10 ? `0${n}` : n;
const now = () => {
  const today = new Date();
  let hours = zeroFill(today.getHours());
  let minutes = zeroFill(today.getMinutes());
  return `${hours}${minutes}`;
};
const today = () => {
  let todayD = new Date();
  return `${todayD.getFullYear()}${(todayD.getMonth() + 1)}${todayD.getDate()}`;
};
const dateFile = d => toUrlFile(formatDate(d));
const orderBy = field => data => R.reverse(R.sortBy(R.prop(field))(data));
const genderType = gender => data => R.filter(filterBy('gender')('genres')(gender))(data);
const subGenderType = subGender => data => R.filter(filterBy('subGender')('genres')(subGender))(data);
const endsBefore = hour => data => R.filter(filterBy('lte')('schedule_air_time')(hour))(data);
const startAt = hour => data => R.filter(filterBy('range')('schedule_air_time')(hour))(data);
const rangeGap = hour => [parseInt(hour) - 10, parseInt(hour) + 10];
const liveAt = hour => data => R.filter(filterBy('live')('schedule_air_time')(hour))(data);

search = slot => {

  const dateView = slot.tiempo && formatDate(slot.tiempo.value) || today();  //--> esto se ussará para hacer la llamada al json
  const timeView = slot.horario && formatTime(slot.horario.value) || now();
  const inview = slot.horario && !!formatTime(slot.horario.value);
  const rangeView = ['0200', '0455'];
  const endView = '2359';
  const gender = slot.tipo && slot.tipo.value || '';
  const subGender = slot.subgenre && slot.subgenre.value || '';
  const orderField = 'year';
  const jsonFile = dateFile(dateView);

  const main = data => {
    const result = R.pipe(
        objectFlatten,

        R.ifElse(
            () => inview,
            startAt(rangeGap(timeView)),
            liveAt(timeView),
        ),

        // startAt(rangeGap(timeView)),
        // startAt(rangeView), // rango de horas
        // endsBefore(endView), // termina antes de la hora indicada
        genderType(toLowerCase(gender)), // hace una búsqueda con like
        subGenderType(subGender),
        orderBy(orderField),
    )(data);
    return result;
  };

  return main(fakeData);
};

module.exports = search;

