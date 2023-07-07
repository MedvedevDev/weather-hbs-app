const request = require('postman-request')
const key = '';

const geocode = (address, callback) => {
    const url = `http://api.positionstack.com/v1/forward?access_key=${key}&query=${address}`;
    request({ url: url, json: true}, (error, response) => {
        if (error) {
            //callback(error)
            callback('Unable to connect to geocode app service!', undefined)
        } else if (response.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, response.body.data[0])
        }
    })
}

module.exports = geocode