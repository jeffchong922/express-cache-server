let path = require('path')

function resolvePathFromSrc (file) {
  return path.resolve(__dirname, '../', file)
}
exports.resolvePathFromSrc = resolvePathFromSrc