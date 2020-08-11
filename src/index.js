const cors = require('cors')
const logger = require('morgan')
const express = require('express')
const { SERVER_PORT } = require('./helpers/secrets')
const { resolvePathFromSrc } = require('./helpers/path')


const mainController = require('./controllers/main')
const userController = require('./controllers/user')
const { getConstellations } = require('./constellation/controllers')
const makeCallback = require('./helpers/express-callback')

const app = express()

app.set('view engine', 'pug')
app.set('views', resolvePathFromSrc('../views'))
app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(resolvePathFromSrc('../public')))

app.get('/', mainController.index)
app.get('/users', userController.list)
app.get('/api/constellations', makeCallback(getConstellations))

app.listen(SERVER_PORT, () => {
  console.log(`服务器启动的端口：${SERVER_PORT}`)
})