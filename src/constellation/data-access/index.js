const makeConstellationsDb = require('./constellations-db'),
      { buildMakeDb } = require('../../../db/memroy')

const dbName = 'constellation',
      makeDb = buildMakeDb({ dbName })

const constellationsDb = makeConstellationsDb({ makeDb })
module.exports = constellationsDb