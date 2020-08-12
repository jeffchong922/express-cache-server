module.exports = function makeListConstellations ({ constellationsDb }) {
  return async function listConstellations ({ consName, type } = {}) {
    const result = isValidData({ consName, type })
    if (!result.success) {
      const message = result.message
      throw new Error(message)
    }
    const constellations = await constellationsDb.findByType({ type, consName })
    if (!constellations) {
      throw new Error('服务器端获取数据失败，请查看控制台检查响应数据!')
    }

    return constellations

    function isValidData({ consName, type }) {
      const result = {
        success: true,
        message: 'passed'
      }
      if (!~['today', 'tomorrow', 'week', 'month', 'year'].indexOf(type)) {
        result.success = false
        result.message = `['today', 'week', 'tomorrow', 'month', 'year'] 为 type 类型的其中一个`
      }
      if (!~['摩羯座', '水瓶座', '双鱼座', '白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '射手座', '天蝎座'].indexOf(consName)) {
        result.success = false
        result.message = `['摩羯座', '水瓶座', '双鱼座', '白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '射手座', '天蝎座'] 为 consName 类型的其中一个`
      }
      return result
    }
  }
}