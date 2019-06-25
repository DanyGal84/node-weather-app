/* eslint-disable no-console */
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Clima',
    name: 'Daniel Galván'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'Acerca de mi',
    name: 'Daniel Galván'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'Esto es un texto de ayuda',
    title: 'Ayuda',
    name: 'Daniel Galván'
  })
})

app.get('/weather', (req, res) => {
  if(!req.query.address) {
    return res.send({
      error: 'Por favor proporciona una dirección'
    })
  }

  geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
    if(error) {
      return res.send({error: error})
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if(error) {
        return res.send({ error })
      }

      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
    })
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'Debes de proporcionar un término de busqueda'
    })
  }
  console.log(req.query.search)
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Artículo de ayuda no encontrado',
    name: 'Daniel Galván'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Página no encontrada',
    name: 'Daniel Galván'
  })
})

app.listen(port, () => {
  console.log(`Server is up and listening on port ${port}!`)
})