const makeListConstellations = require('./list-constellations')
const constellationsDb = require('../data-access')

const listConstellations = makeListConstellations({ constellationsDb })

exports.listConstellations = listConstellations