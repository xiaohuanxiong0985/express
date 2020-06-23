const config = require('./config.json');
const querystring = require('querystring');
const request = require('request');
const express = require('express');
const router = express.Router();
const WXBizDataCrypt = require('./WXBizDataCrypt')
const jwt = require('jsonwebtoken');  //  生成token
const db = require('../util/db'); //  数据库方法
/* GET home page. */
router.get('/userList', function(req, res, next) {
  db.query('user')
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      res.json({ code: 400, msg: '查找失败', data: err })
    })
});
router.post('/login', function (req, res) {
  const data = {
    'appid': config.appId,
    'secret': config.appSecret,
    'js_code': req.body.code,
    'grant_type': 'authorization_code'
  };
  let content = querystring.stringify(data);
  const url = `https://api.weixin.qq.com/sns/jscode2session?${content}`;
  request.get({
    url
  }, (error, response, body) => {
    let token = {};
    try {
      let abody = JSON.parse(body);
      const sessionKey = abody.session_key; //  code获取的session_key
      const pc = new WXBizDataCrypt(config.appId, sessionKey)  //  解析加密数据
      const data = pc.decryptData(req.body.encryptedData , req.body.iv) //  解析后的用户信息-用于换取token
      token = {
        code: 200,
        data: sessionKey,
        msg: '获取token成功'
      }
      // 将请求的内容返回给前端
      // res.json(token)
    }catch (e) {
      token = {
        code: 300,
        data: e,
        msg: '获取token失败'
      }
    }
    res.json(token)
  })
})
//  解密
router.post('/index/main/getuserInfo', function (req, res) {
  const token = req.body.token;
  const data = {
    code: '200',
    data: {
      name: '香辣脆小浣熊'
    },
    msg: '获取用户信息成功'
  }
  res.send(data);
})
//  session_key:Dm32tM+kQeI+x9eFSz6w1w==
module.exports = router;
