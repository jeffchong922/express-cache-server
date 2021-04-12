const cors = require('cors'),
      logger = require('morgan'),
      express = require('express')

const { SERVER_PORT } = require('./config/secrets'),
      { getConstellations } = require('./src/constellation/controllers'),
      makeCallback = require('./helpers/express-callback')

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/api/constellations', makeCallback(getConstellations))

app.listen(SERVER_PORT, () => {
  console.log(`服务器启动的端口：${SERVER_PORT}`)
  console.log(`基础地址: http://localhost:${SERVER_PORT}`)
})