const mysql = require('mysql');
const db = {
  sql (sql, callback) {
    if (!sql) {
      callback();
      return false;
    }
    mysql.createPool(this.config())
      .query(sql, (err, rows, fields) => {
        if (err) {
          console.log(err);
          callback(err, null);
          return;
        }
        callback(null, rows, fields);
      })
  },
  config () {
    return {
      host: 'localhost',
      user: 'root',
      password: 'play933364',
      port: '3306',
      database: 'xiaochengxu',
      connectionLimit: 10
    }
  }
}
module.exports = db;