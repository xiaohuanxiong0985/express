const mysql = require('mysql');
//  开启连接池
const config = {
  host: 'localhost',
  user: 'root',
  password: 'play933364',
  port: '3306',
  database: 'xiaochengxu',
  connectionLimit: 10
}
let pool = mysql.createPool(config);
let query = function(sql, params, callback) {
  try {
    pool.getConnection((err, connection) => {
      if (err) {
        return callback(true);
      }
      connection.query(sql, params, (err, result) => {
        connection.release();
        if (err) {
          console.error('db error')
          return callback(true)
        }
        callback(false, result);
      })
    })
  } catch (e) {
    return callback(true)
  }
}


module.exports.query = query;
