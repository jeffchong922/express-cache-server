function makeGetConstellations ({ listConstellations }) {
  const headers = {
    'Content-Type': 'application/json'
  }
  return async function getConstellations (httpRequest) {
    try {
      const { consName, type } = httpRequest.query
      const constellationInfo = await listConstellations({ consName, type })
      return {
        headers,
        statusCode: 200,
        body: constellationInfo
      }
    }
    catch (error) {
      console.error(`getConstellations 获取数据失败 e: ${error}`)
      return {
        headers,
        statusCode: 400,
        body: {
          error: error.message
        }
      }
    }
  }
}

module.exports = makeGetConstellations