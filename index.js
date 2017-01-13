//main starting point of the application
const express = require('express');
const http = require('http')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')

//create an instance of express
const app = express()
const router = require('./router')

//DB setup
mongoose.connect('mongodb://localhost:auth/auth')

//App setup (setting up express)

//morgan to log incoming requests
app.use(morgan('combined'))

//allow whatever domain or port request is coming from
//let them through
app.use(cors())

//parse incoming request into JSON 
//it will do so no matter what the request type is
app.use(bodyParser.json({ type: '*/*'}))


//call the router with our app
router(app)


//server setup
const port = process.env.PORT || 3000

//create HTTP server and forward it to our express application
const server = http.createServer(app)

//tell server to listen
server.listen(port)
console.log('server listen on: ', port)