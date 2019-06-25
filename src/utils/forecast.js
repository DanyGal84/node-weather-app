const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = 'https://api.darksky.net/forecast/f60fae1eb1c3a5943c364cbb4b160878/'+ latitude +','+ longitude + '?units=si&lang=es';
  request({ url, json: true}, (error, { body }) => {
    if(error) {
      callback('¡No se puede conectar al servidor de clima!', undefined);
    } else if (body.error) {
      callback('¡No se puede encontrar la ubicación!', undefined);
    } else {
      callback(undefined, body.daily.data[0].summary + ' Actualmente la temperatura es de ' + body.currently.temperature + '° centigrados. Hay un ' + body.currently.precipProbability + '% de posibilidad de lluvia. La máxima temperatura de hoy será de ' + body.daily.data[0].temperatureMax + '° centigrados y la mínima temperatura sera de ' + body.daily.data[0].temperatureMin + '° centigrados.');
    }
  });
}

module.exports = forecast;