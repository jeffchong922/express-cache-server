const fs =require('fs')
const dotenv = require('dotenv')

if (fs.existsSync('.env')) {
  console.log('使用 .env 文件加载环境变量')
  dotenv.config({ path: '.env' })
} else {
  console.log('使用 .env.example 文件加载环境变量')
  dotenv.config({ path: '.env.example' })
}

const CONSTELLATION_API_URL = process.env['JUHE_CONSTELLATIONS_API_URL']
exports.CONSTELLATION_API_URL = CONSTELLATION_API_URL

const CONSTELLATIONS_APP_KEY = process.env['JUHE_CONSTELLATIONS_APP_KEY']
exports.CONSTELLATIONS_APP_KEY = CONSTELLATIONS_APP_KEY

const SERVER_PORT = process.env['SERVER_PORT']
exports.SERVER_PORT = SERVER_PORT || 8848

console.log(`正在配置环境变量，CONSTELLATION_API_URL: ${CONSTELLATION_API_URL} ; CONSTELLATIONS_APP_KEY: ${CONSTELLATIONS_APP_KEY} ; SERVER_PORT: ${SERVER_PORT}`)

if (!CONSTELLATIONS_APP_KEY) {
  console.log("没有密钥，请设置 JUHE_CONSTELLATIONS_API_URL 环境变量");
  process.exit(1);
}
if (!CONSTELLATION_API_URL) {
  console.log("没有接口地址，请设置 JUHE_CONSTELLATIONS_APP_KEY 环境变量");
  process.exit(1);
}
