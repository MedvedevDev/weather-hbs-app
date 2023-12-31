const request = require('postman-request')
const key = '';

const forecast = (coords, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${key}&query=${coords.latitude},${coords.longitude}`;
    request({ url: url, json: true}, (error, { body } = {}) => { // response was used before destructuring {body}
        if (error) {
            //callback(error)
            callback('Unable to connect to weather app service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, `Overcast: Is is currently ${body.current.temperature}, it feels like ${body.current.feelslike}. The humidity is ${body.current.humidity}`)
        }
    })
}

module.exports = forecast