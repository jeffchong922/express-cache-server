exports.list = function (req, res, next) {
  res.render('user/list', {
    title: '用户列表',
    users: [
      { name: '张三' },
      { name: '李四' },
      { name: '王五' }
    ]
  })
}