const axios = require('axios'),
      { CONSTELLATION_API_URL, CONSTELLATIONS_APP_KEY } = require('../../../config/secrets')

// db 为 Map 类型，使用内存存储数据
function makeConstellationsDb ({ makeDb }) {
  return Object.freeze({
    find
  })

  async function find ({ type, consName }) {
    const db = await makeDb()

    /**
     * {
     *    'today': { 星座: 数据 },
     *    ...
     * }
     */

    let typeMap = db.get(type) || new Map()
    db.set(type, typeMap)

    if (!typeMap.get(consName)) {
      const data = await fetchConstellations({ type, consName })
      if ((typeof data.error_code !== 'undefined') && (data.error_code === 0)) {
        typeMap.set(consName, data)
      }
    }

    const prev = typeMap.get(consName)
    if (prev && isNeedToUpdate(type, prev)) {
      const data = await fetchConstellations({ type, consName })
      if ((typeof data.error_code !== 'undefined') && (data.error_code === 0)) {
        typeMap.set(consName, data)
      }
    }

    return typeMap.get(consName) || null
  }

  function isNeedToUpdate (type, data) {
    let prevDate
    let curDate = Date.now()
    switch (type) {
      case 'today':
        prevDate = data.date
        curDate = Number(new Date().toISOString().slice(0, 10).replace(/-/g,''))
        break
      case 'tomorrow':
        prevDate = data.date
        curDate = Number(new Date().toISOString().slice(0, 10).replace(/-/g,'')) + 1
        break
      case 'week':
        prevDate = data.weekth
        curDate = getWeekOfYear()
        break
      case 'month':
        prevDate = data.month
        curDate = new Date().getMonth() + 1
        break
      case 'year':
        prevDate = data.year
        curDate = new Date().getFullYear()
        break
      default:
        throw new Error(`isNeedToUpdate unknown type: ${type}`)
    }
    console.log('isNeedToUpdate compare: ', prevDate, curDate)
    return prevDate !== curDate
  }

  async function fetchConstellations ({ consName, type }) {
    const { data } = await axios.get(CONSTELLATION_API_URL, {
      params: {
        consName,
        type,
        key: CONSTELLATIONS_APP_KEY
      }
    })
    console.log(`type: ${type}, consName: ${consName} ; fetchConstellations 请求数据结果：`, data)
    return data
  }

  // 参考：https://blog.csdn.net/ziwen00/article/details/12579305
  function getWeekOfYear () {
    let time, week
    const checkDate = new Date()
    checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7))
    time = checkDate.getTime()
    checkDate.setMonth(0)
    checkDate.setDate(1)
    week = Math.floor(Math.round((time -checkDate) / 86400000) / 7) + 1
    return week
  }
}

module.exports = makeConstellationsDb