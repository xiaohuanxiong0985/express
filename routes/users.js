var express = require('express');
var router = express.Router();
const config = require('./config.json');
const WXBizDataCrypt = require('./WXBizDataCrypt')

//  获取用户信息
router.post('/getuserInfo', function (req, res) {
  const token = req.body.token;
  let data = {};
  try {
    data = {
      code: 200,
      data: {
        nickName: '香辣脆小浣熊',
        avatarUrl: 'url'
      },
      msg: '获取用户信息成功'
    }
  }catch (e) {
    data = {
      code: 300,
      data: e,
      msg: '获取用户信息失败'
    }
  }
  // const pc = new WXBizDataCrypt(config.appId, token)  //  解析加密数据
  // const userInfo = pc.decryptData(req.body.encryptedData , req.body.iv);
  res.send(data);
})

module.exports = router;
