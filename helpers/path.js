const path = require('path')

/**
 * 项目根目录相对路径
 * @param {string} filePath 
 */
const resolve = filePath => path.join(process.cwd(), filePath)

module.exports = {
  resolve
}