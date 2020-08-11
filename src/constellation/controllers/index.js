const { listConstellations } = require('../use-cases')
const makeGetConstellations = require('./get-constellations')

const getConstellations = makeGetConstellations({ listConstellations })

exports.getConstellations = getConstellations