require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const myRouter = require('./routes/router')
const runner = require('./test-runner');

const URI = process.env.MONGO_URI
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })

const port = process.env.PORT || 3000
const app = express()
const router = express.Router()

app.use( cors({ origin: '*' }) )
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '10mb', type: 'application/json' }));

app.use('/', router)
myRouter(router)

app.listen(port, function () {
    console.log(process.env.ENV, ': Listening on port', port, '- start:', Date(Date.now()).toString())
    try {
        if(process.env.ENV === 'TEST') {
            runner.run();
        }
      } catch(e) {
        console.log('Tests are not valid:');
        console.error(e);
      }
})

module.exports = app // for testing