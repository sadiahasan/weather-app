const request = require('request');

var getWeather = (lat, lng, callback) =>{
	request({
	url: `https://api.forecast.io/forecast/8fa491883cf46553f68e214bc3566e17/${lat},${lng}`,
	json: true
	}, (error, response, body) =>{
	if(!error && response.statusCode === 200){
		callback(undefined, {
			temperature: body.currently.temperature, 
			apparentTemperature: body.currently.apparentTemperature}) 
	}else {
		callback('Unable to fetch weather');
	}})}

module.exports.getWeather = getWeather;

