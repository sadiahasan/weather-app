const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
	.options({
		a: {
			demand: true,
			alias: 'address',
			describe: 'Address to fetch weather for',
			string: true
		}
	})
	.help()
	.alias('help','h')
	.argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeURL).then((response) => { //first promise
		if (response.data.status === 'ZERO_RESULTS') {
			throw new Error('Unable to find that address.');
		}
		var lat = response.data.results[0].geometry.location.lat;
		var lng = response.data.results[0].geometry.location.lng;
		var weatherUrl = `https://api.forecast.io/forecast/8fa491883cf46553f68e214bc3566e17/${lat},${lng}`;
		console.log(response.data.results[0].formatted_address);
		return axios.get(weatherUrl); //second promise
	}).then((response) => {
		var temperature = response.data.currently.temperature;
		var apparentTemperature = response.data.currently.apparentTemperature;
		console.log(`It's currently ${temperature} degrees. It feels like ${apparentTemperature} degrees.`);
	}).catch((e) => {
		if(e.code === 'ENOTFOUND') {
			console.log('Unable to connect to API servers');
		}else{
			console.log(e.message);
		}
});





