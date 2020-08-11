const mongodb = require('mongodb')

const clientStorage = new Map()
const MongoClient = mongodb.MongoClient

exports.buildMakeDb = function ({ dbUrl, dbName }) {
  let dbClient
  if (clientStorage.has(dbUrl)) {
    dbClient = clientStorage.get(dbUrl)
  }
  else {
    dbClient = new MongoClient(url, { useNewUrlParser: true })
    clientStorage.set(url, dbClient)
  }
  return async function makeDb () {
    if (!dbClient.isConnected()) {
      await client.connect()
    }
    return client.db(dbName)
  }
}