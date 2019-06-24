const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = 'https://api.darksky.net/forecast/f60fae1eb1c3a5943c364cbb4b160878/'+ latitude +','+ longitude + '?units=si&lang=es';
  request({ url, json: true}, (error, { body }) => {
    if(error) {
      callback('Unable to connect to forecast server!', undefined);
    } else if (body.error) {
      callback('Unable to find location!', undefined);
    } else {
      callback(undefined, body.daily.data[0].summary + ' Actualmente la temperatura es de ' + body.currently.temperature + ' grados centigrados. Hay un ' + body.currently.precipProbability * 100 + '% de posibilidad de lluvia.');
    }
  });
}

module.exports = forecast;