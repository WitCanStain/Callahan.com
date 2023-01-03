const SQLite = require('better-sqlite3');
const conf = require('./conf/config');
const sql = SQLite(conf.sqlLite.fileNameGiven);
sql.pragma('journal_mode = WAL')
console.info(`db loaded`)
module.exports = sql


