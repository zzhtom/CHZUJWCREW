'use strict';
/**
 * db config
 * @type {Object}
 */
export default {
  type: 'mysql',
  log_sql: true,
  log_connect: true,
  connectionLimit: 10,
  adapter: {
    mysql: {
      // host: '45.62.101.211',
      host: '192.168.1.106',
      port: '3306',
      database: 'jw_crew',
      user: 'root',
      password: 'zzhzzhzzh',
      prefix: 'think_',
      encoding: 'utf8'
    },
    mongo: {

    }
  }
};