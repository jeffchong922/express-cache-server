const dotenv = require('dotenv'),
      { fileExist } = require('../helpers/fs'),
      { resolve } = require('../helpers/path')

if (fileExist('.env')) {
  dotenv.config({ path: resolve('.env') })
} else {
  dotenv.config({ path: resolve('.env.example') })
}

const SERVER_PORT = process.env['SERVER_PORT'] || 8848,
      CONSTELLATION_API_URL = process.env['JUHE_CONSTELLATIONS_API_URL'],
      CONSTELLATIONS_APP_KEY = process.env['JUHE_CONSTELLATIONS_APP_KEY']

module.exports = {
  SERVER_PORT,
  CONSTELLATION_API_URL,
  CONSTELLATIONS_APP_KEY
}

console.log(`当前配置数据：${JSON.stringify(module.exports, undefined, 2)}`)

if (!CONSTELLATIONS_APP_KEY) {
  console.log("没有密钥，请设置 JUHE_CONSTELLATIONS_APP_KEY 环境变量");
  process.exit(1);
}
if (!CONSTELLATION_API_URL) {
  console.log("没有接口地址，请设置 JUHE_CONSTELLATIONS_API_URL 环境变量");
  process.exit(1);
}
