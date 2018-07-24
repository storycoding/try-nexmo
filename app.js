const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const Nexmo = require('nexmo')
const socketio = require('socket.io')

//init Nexmo
const nexmo = new Nexmo( 
	{
		apiKey: process.env.APIKEY || '',
		apiSecret: process.env.APISECRET || '' 
	},
	{
		debug: true
	}
)

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

	const number = req.body.number
	const text = req.body.text

	nexmo.message.sendSms(
		process.env.VIRTUALNUMBER || '', // virtual number /dfrom=
		number,
		text,
		{ type : 'unicode' },
		(err, resData) => {
			if(err) {
				console.log(err) 
			} else {
				console.dir(resData)

				const data = {
					id : resData.messages[0]['message-id'],
					number : resData.messages[0]['to']
				}

				io.emit('smsStatus', data)
			}
		}
	)
	console.log(req.body)
} )

// define port
const PORT = process.env.PORT || 3000

// start server
const server = app.listen( PORT, () => console.log(`Server started on port ${PORT}`) )


// socket.io setup
const io = socketio(server)

io.on( 'connection',
	() => {
		console.log('connected')
		io.on( 'disconnect', () => console.log('Disconnected') )
	}
)