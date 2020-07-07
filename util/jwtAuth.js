//  校验token是否有效
module.exports = function(req, res, next) {
  const needAuth = [
    '/userList'
  ]
  //  获取接口路径
  let path = req.originalUrl;
  console.log(req)
  //  判断是否需要校验token的接口
  //  不需要校验的接口 ->
  if (needAuth.indexOf(path) !== -1) {
    return next();
  }
  //  需要校验
  var token = req.headers['authOrization'];
  if (!token) {
    return res.json({
      code: 401,
      message: `没有token,先去获取token吧`
    })
  }
  try {
    //  解密获取token
    let deCoded;
    //  let deCoded = token + 解密函数
    //  校验token是否过期
    if (deCoded.exp <= Date.now()) {
      return res.json({
        code: 401,
        msg: 'token过期了.去重新获取吧'
      })
    }
    next();
  } catch (err) {
    return res.json({
      code: 401,
      mes: `token不对.重新去获取吧`
    })
  }
}
