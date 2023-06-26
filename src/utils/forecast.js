const request = require('postman-request')

const forecast = (coords, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=547fe38ec3d4b6aa787b6e2e27845e27&query=${coords.latitude},${coords.longitude}`;
    request({ url: url, json: true}, (error, { body } = {}) => { // response was used before destructuring {body}
        if (error) {
            //callback(error)
            callback('Unable to connect to weather app service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current)
        }
    })
}

module.exports = forecast