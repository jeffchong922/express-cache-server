const makeListConstellations = require('./list-constellations'),
      constellationsDb = require('../data-access')

const listConstellations = makeListConstellations({ constellationsDb })

module.exports = {
  listConstellations
}