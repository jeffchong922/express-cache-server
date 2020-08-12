const axios = require('axios')
const { CONSTELLATION_API_URL, CONSTELLATIONS_APP_KEY } = require('../../helpers/secrets')

// db 为 Map 类型，使用内存存储数据
module.exports = function makeConstellationsDb ({ makeDb }) {
  return Object.freeze({
    findByType
  })

  async function findByType ({ type, consName }) {
    const db = await makeDb()
    let typeMap = db.get(type)
    // 从网络获取数据
    if (!typeMap) {
      typeMap = new Map()
      db.set(type, typeMap)
    }
    if (!typeMap.get(consName)) {
      const data = await fetchConstellations({ type, consName })
      if ((typeof data.error_code !== 'undefined') && (data.error_code === 0)) {
        typeMap.set(consName, data)
      }
    }
    const oldData = typeMap.get(consName)
    if (oldData && isNeedToUpdate(type, oldData)) {
      const data = await fetchConstellations({ type, consName })
      if ((typeof data.error_code !== 'undefined') && (data.error_code === 0)) {
        typeMap.set(consName, data)
      }
    }
    return typeMap.get(consName) || null
  }

  // 只为当前数据而用
  function isNeedToUpdate (type, data) {
    let oDate
    let nDate = Date.now()
    switch (type) {
      case 'today':
        oDate = data.date
        nDate = Number(new Date().toISOString().slice(0, 10).replace(/-/g,''))
        break
      case 'tomorrow':
        oDate = data.date
        nDate = Number(new Date().toISOString().slice(0, 10).replace(/-/g,'')) + 1
        break
      case 'week':
        oDate = data.weekth
        nDate = getWeekOfYear()
        break
      case 'month':
        oDate = data.month
        nDate = new Date().getMonth() + 1
        break
      case 'year':
        oDate = data.year
        nDate = new Date().getFullYear()
        break
      default:
        throw new Error('unknown')
    }
    console.log('compare: ', oDate, nDate)
    return oDate !== nDate
  }

  async function fetchConstellations ({ consName, type }) {
    const { data } = await axios.get(CONSTELLATION_API_URL, {
      params: {
        consName,
        type,
        key: CONSTELLATIONS_APP_KEY
      }
    })
    console.log(`type: ${type}, consName: ${consName} ; 请求数据结果：`, data)
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