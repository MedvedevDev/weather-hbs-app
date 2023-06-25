const request = require('postman-request')

const geocode = (address, callback) => {
    const url = `http://api.positionstack.com/v1/forward?access_key=ab41d1cf9a2e02082ecb5cd8e1b7157c&query=${address}`;
    request({ url: url, json: true}, (error, response) => {
        if (error) {
            //callback(error)
            callback('Unable to connect to geocode app service!', undefined)
        } else if (response.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, response.body)
        }
    })
}

module.exports = geocode