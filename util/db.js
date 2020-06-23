const db = require('../config/db'); //  引入数据库方法
/*
 * 查询所有
 * @param tableName
 * @param result
 */
function query (tableName) {
  return new Promise((resolve, reject) => {
    db.sql(`SELECT * FROM ${tableName}`, (err, result) => {
      if (err) {
        reject(err)
        return;
      }
      resolve(result)
    });
  })
}

module.exports = {
  query
}