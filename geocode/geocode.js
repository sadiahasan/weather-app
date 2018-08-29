const request = require('request');

var geocodeAddress = (address, callback) => {
	var encodedAddress = encodeURIComponent(address);

	request({
	// url: `http://www.mapquestapi.com/geocoding/v1/address?key=D2seL6d8VWI8O4cYGqlrFLiCzpqaG6bZ&location=${encodedAddress}`,
	url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
	json: true
	}, (error, response, body) =>{
	if (error) {
		callback('Unable to connect to Google servers.');
	} else if (body.status === 'ZERO_RESULTS'){
		callback('Unable to find that address');
	}else if(body.status === 'OK'){
		callback(undefined, {
			address: body.results[0].formatted_address,
  			latitude: body.results[0].geometry.location.lat,
  			longitude: body.results[0].geometry.location.lng
	})};
});

};


module.exports.geocodeAddress = geocodeAddress;
