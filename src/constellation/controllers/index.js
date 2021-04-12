const { listConstellations } = require('../use-cases'),
      makeGetConstellations = require('./get-constellations')

const getConstellations = makeGetConstellations({ listConstellations })

module.exports = {
  getConstellations
}