const makeConstellationsDb = require('./constellations-db')
const { buildMakeDb } = require('../../db/memoryDb')

const dbName = 'constellation'
const makeDb = buildMakeDb({ dbName })

const constellationsDb = makeConstellationsDb({ makeDb })
module.exports = constellationsDb