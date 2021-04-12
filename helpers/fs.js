const fs = require('fs')
const { resolve } = require('./path')

/**
 * 项目根目录相对路径
 * @param {string} path 
 */
const fileExist = path => fs.existsSync(resolve(path))

module.exports = {
  fileExist
}