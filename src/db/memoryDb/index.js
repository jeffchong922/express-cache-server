const clientStorage = new Map()

exports.buildMakeDb = function ({ dbName }) {
  let dbClient
  if (clientStorage.has(dbName)) {
    dbClient = clientStorage.get(dbName)
  }
  else {
    dbClient = new Map()
    clientStorage.set(dbName, dbClient)
  }
  return async function makeDb () {
    return dbClient
  }
}