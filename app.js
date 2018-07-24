const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const Nexmo = require('nexmo')
const socketio = require('socket.io')

// init app
const app = express()

// template engine setup
app.set( 'view engine', 'html' )
app.engine( 'html', ejs.renderFile )

// public folder setup
app.use( express.static(__dirname + '/public') )

// body pardser middleware setup
app.use( bodyParser.json() )
app.use( bodyParser.urlencoded( { extended: true } ) )

// index route
app.get( '/', (req, res) => {
	res.render('index')
} )


// catch form submit
app.post('/', (req, res) => {
	res.send(req.body)
	console.log(req.body)
} )

// define port
const PORT = process.env.PORT || 3000

// start server
const server = app.listen( PORT, () => console.log(`Server started on port ${PORT}`) )