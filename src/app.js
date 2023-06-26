const path = require('path')
const express = require('express') //express returns single function
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const myApplication = express()
const port = process.env.PORT || 3000

const pathToPublicFolder = path.join(__dirname, '../public/');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
myApplication.set('view engine', 'hbs'); // to use handlebars
myApplication.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// app.use() it`s a way to customize your server
myApplication.use(express.static(pathToPublicFolder)) //we can provide here only absolute root path


myApplication.get('', (req, res) => { //root url
    // 1st argument - name of the vue to render,
    // 2nd - object which contains all the values you want that view to be able to access
    res.render('index', {
        title: 'Weather App',
        name: 'Artemio Medvedinni'
    })
})

myApplication.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Artemio Medvedinni'
    })
})

myApplication.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Emergency help',
        title: 'HELP',
        name: 'Artemio Medvedinni'
    })
})


myApplication.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address = 'boston', (error, response) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        forecast({latitude: response.data[0].latitude, longitude: response.data[0].longitude}, (error, {temperature, feelslike, humidity} = {}) => {
            if (error) {
                return res.send({
                    error: error
                })
            }

            res.send({
                forecast: `Overcast: Is is currently ${temperature}, it feels like ${feelslike}. The humidity is ${humidity}`,
                //location: response.data[0].location,
                address: req.query.address
            })
        })
    })
})

myApplication.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Artemio Medvedinni',
        errorMessage: 'Help article not found'
    })
})

// * = match anything that have not been matched yet
myApplication.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Artemio Medvedinni',
        errorMessage: 'PAGE NOT FOUND'
    })
})

myApplication.listen(port, () => {
    console.log('Server is started')
})